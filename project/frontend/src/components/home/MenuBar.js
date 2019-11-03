import React, { useState } from "react";
import MainFeedList from './MainFeedList';
import MenuListItem from './MenuListItem';
import { Link } from "react-router-dom";


export default function MenuBar(props) {    

    const titles = ["Home", "About", "Docket", "Polls", "Representatives"];
    const links = ['/', '/about', '/docket', '/polls', '/representatives']

    const linkList = titles.map((title, index) => {

        return (
            <Link className="link" to={links[index]} key={title}>
                <MenuListItem id={title} value={title} ></MenuListItem>
            </Link>
        );
    });
    
    return (
        <MainFeedList className="menu-bar">
            {linkList}
        </MainFeedList>
    );
}
