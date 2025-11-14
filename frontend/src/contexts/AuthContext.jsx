import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const API_BASE_URL = 'http://localhost/booking'

  const apiRequest = async (endpoint, data) => {
    try {
      console.log(`🔄 Sending request to: ${API_BASE_URL}/${endpoint}`)
      
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      // Get the response text first
      const responseText = await response.text()
      console.log('📨 Raw response:', responseText)

      let result
      try {
        // Try to parse as JSON
        result = JSON.parse(responseText)
      } catch (parseError) {
        console.error('❌ JSON parse error:', parseError)
        throw new Error(
          `Server returned invalid JSON. This usually means there's a PHP error on the server. Response: ${responseText.substring(0, 100)}...`,
        )
      }

      console.log('✅ Parsed response:', result)
      return result
      
    } catch (error) {
      console.error('❌ API Request failed:', error)
      throw error
    }
  }

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
    setLoading(false)
  }, [])

  const register = async (userData) => {
    try {
      console.log('🚀 Starting registration...', {
        name: userData.name,
        email: userData.email,
        role: userData.role,
        passwordLength: userData.password.length,
      })

      const result = await apiRequest('api.php', {
        action: 'register',
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role || 'customer',
      })

      console.log('📩 Registration result:', result)

      if (result.success) {
        setCurrentUser(result.user)
        localStorage.setItem('currentUser', JSON.stringify(result.user))
        return {
          success: true,
          message: result.message,
        }
      } else {
        return {
          success: false,
          message: result.message || 'Registration failed',
        }
      }
    } catch (error) {
      console.error('💥 Registration error:', error)
      return {
        success: false,
        message: error.message,
      }
    }
  }

  const login = async (email, password) => {
    try {
      const result = await apiRequest('api.php', {
        action: 'login',
        email: email,
        password: password,
      })

      if (result.success) {
        setCurrentUser(result.user)
        localStorage.setItem('currentUser', JSON.stringify(result.user))
        return { success: true, message: result.message }
      } else {
        return { success: false, message: result.message }
      }
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        message: error.message,
      }
    }
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
  }

  const testConnection = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/test.php`)
      const responseText = await response.text()
      
      let result
      try {
        result = JSON.parse(responseText)
      } catch (e) {
        return {
          success: false,
          message: `Backend returned invalid JSON. PHP error likely. Response: ${responseText.substring(0, 100)}...`,
        }
      }
      
      return result
    } catch (error) {
      return {
        success: false,
        message: `Cannot connect to backend: ${error.message}`,
      }
    }
  }

  const value = {
    currentUser,
    register,
    login,
    logout,
    testConnection,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
