import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { sideNavBar, sideNavBarHover, primaryColor, lightBackground } from '../../styles/colors';
import Arrow from '../../assets/images/arrow-icon.png';
import SearchWhite from '../../assets/images/search-icon-white.png';
import Image from 'next/image';

export default function SideNavBar() {
    const location = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const parseTitlefromUrl = () => {
        const title = location.pathname.split('/').join(' ').slice(1);
        return title.charAt(0).toUpperCase() + title.slice(1);
    };

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <>
            <MobileNavbar>
                {/* Hamburger button */}
                <MenuButton onClick={() => setIsOpen(true)}>
                    <div />
                    <div />
                    <div />
                </MenuButton>
                {/* On mobile the title is dinamically generated based on the url */}
                <MobilePageTitle>{parseTitlefromUrl()}</MobilePageTitle>
            </MobileNavbar>

            <SideNavBarCont visible={isOpen}>
                <SideNavHeader>
                    Wesley
                    <MenuButton onClick={() => setIsOpen(false)}>
                        <Image src={Arrow} alt="Arrow pointing down" />
                    </MenuButton>
                </SideNavHeader>
                <Link href="/discover">
                    <SideNavMainLink>
                        Discover
                        <Image src={SearchWhite} alt="Magnifying glass" width="28" height="28"/>
                    </SideNavMainLink>
                </Link>
                <SideNavSectionTitle>
                    <HeaderText>Watched</HeaderText>
                </SideNavSectionTitle>
                <Link href="#"><NavLink >Movies</NavLink></Link>
                <Link href="#"><NavLink >Tv Shows</NavLink></Link>
                <SideNavSectionTitle>
                    <HeaderText>Saved</HeaderText>
                </SideNavSectionTitle>
                <Link href="#"><NavLink >Movies</NavLink></Link>
                <Link href="#"><NavLink >Tv Shows</NavLink></Link>
            </SideNavBarCont>
        </>
    );
}

const SideNavBarCont = styled.div`
    position: fixed;
    z-index: 9;
    width: 280px;
    height: 100%;
    background-color: ${sideNavBar};
    color: white;
    @media (max-width: 1024px) {
        width: 200px;
        font-size: 0.8em;
    }
    @media (max-width: 768px) {
        top: 0;
        right: 100%;
        transform: ${(props: { visible: boolean }) => (props.visible ? 'translateX(100%)' : 'translateX(-100%)')};
        transition: transform 0.6s;
        width: 100%;
        font-size: 1em;
    }
`;

const SectionsStyles = css`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 35px;
    font-size: 1.6em;
    font-weight: 700;
    color: white;
`;

const SideNavMainLink = styled.div`
  ${SectionsStyles}

  &:hover, &:focus-visible {
    background: ${sideNavBarHover};
  }

  &.active {
    background: ${primaryColor};
  }
  img {
    margin-left: 1rem;
  }
`;

const SideNavHeader = styled.div`
    ${SectionsStyles}
`;

const SideNavSectionTitle = styled.div`
    font-size: 1.6em;
    font-weight: 700;
    padding: 25px 0 15px 35px;
`;

const HeaderText = styled.div`
    padding: 0 35px 10px 0;
    border-bottom: 1px solid ${lightBackground};
`;

const NavLink = styled.div`
  display: block;
  color: white;
  opacity: 0.8;
  font-size: 1.2em;
  padding: 10px 35px;

  &:hover,
  &:focus-visible {
    opacity: 1;
    background: ${sideNavBarHover};
  }

  &.active {
    background: ${primaryColor};
    opacity: 1;
  }
`;

const MobileNavbar = styled.div`
    width: 100%;
    padding: 0 15px;
    display: flex;
    @media (min-width: 769px) {
        display: none;
    }
`;

const MenuButton = styled.button`
    background-color: transparent;
    border: 0;

    @media (max-width: 768px) {
        cursor: pointer;
    }

    div {
        width: 35px;
        height: 3px;
        background-color: black;
        margin: 6px 0;
        border-radius: 2px;
    }
`;

const MobilePageTitle = styled.h1`
    margin-left: 24px;
    font-weight: 500;
`;
