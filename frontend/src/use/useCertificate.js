import { useState, useEffect } from 'react'
import axios from 'axios'

function useCertificate() {
  const [certificate, setCertificate] = useState({
    loading: false,
    localUserName: null
  })
  function init() {
    return axios.get('/api/auth/me')
      .then((res => setCertificate({
        loading: true,
        localUserName: res.data.data.m_name
      })))
  }

  useEffect(() => {
    init()
  }, [])

  return certificate
}

export default useCertificate