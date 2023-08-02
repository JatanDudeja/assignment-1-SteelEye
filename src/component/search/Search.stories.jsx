import React, { Component } from "react"
import Search from "./Search"

export default {
    label : 'We Want/Search',
    component : Search
}

export const small = () => <Search size='small' />
export const medium = () => <Search size='medium'/>
export const large = () => <Search size='large'/>