import axios from 'axios';
import React from 'react'
import { createContext, useEffect, useState } from "react";
import { BASE_URL, CRYPTO_CURRENCY_URI, USER_LIST } from '../constant/apiurl';
import { useTheme } from '@emotion/react';


const DataContext = createContext({})
export const DataProvider = ({ children }) => {
  const userToken = localStorage.getItem('token')
  const token = userToken;
  const user = parseJwt(token)
  const [activeUser, setActiveUser] = useState(user?.userId)
  const [userDetail, setUserDetail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [allUser, setAllUser] = useState([])
  const [CryptoCurrencyPrice, setCryptoCurrencyPice] = useState('')
  const [CryptoCurrency, setCryptoCurrency] = useState('')
  const theme = useTheme();

  // parse JWT token
  function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }



  // get user detail
  const getUserDetails = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${BASE_URL}/${activeUser}`)
      if (response.status >= 200 && response.status <= 299) {
        setUserDetail(response.data)
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
    }
  }

  // get all user
  const getAllUserDetails = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(USER_LIST)
      if (response.status >= 200 && response.status <= 299) {
        setAllUser(response.data.auth)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  // get crypto currency details
  const getCryptocurrencyPrice  = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(CRYPTO_CURRENCY_URI)
      if (response.status >= 200 && response.status <= 299) {
        setCryptoCurrencyPice(response.data.bpi)
        setCryptoCurrency(response.data)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUserDetails()
    getAllUserDetails()
    getCryptocurrencyPrice()
  }, [activeUser])


  return (
    <DataContext.Provider value={{ userDetail, getUserDetails, isLoading, setIsLoading, allUser, setAllUser, CryptoCurrencyPrice, theme }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataContext