import React, { useState } from "react";
import { Drawer, Affix, Avatar, Menu, Popover } from "antd";
import { Link, NavLink, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { BreakpointProvider, Breakpoint } from "react-socks";
import CloseIcon from "../svg/CloseIcon";
import Logo from "../svg/Logo";
import MenuIcon from "../svg/MenuIcon";
import { logout } from "../../actions/auth-actions/actions";

import "./navbar.scss";
import "./drawer.scss";

const Navbar = () => {
    const isLoggedIn = useSelector(
        reduxStore => reduxStore.authReducer.isLoggedIn
    );
    const user = useSelector(reduxStore => reduxStore.authReducer.user);
    return (
        <BreakpointProvider>
            <Affix
                style={{
                    width: "100%"
                }}
            >
                <div className="navbar">
                    <div className="navbar-inner">
                        <Link to={"/"}>
                            <div className="navbar-brand">
                                <Logo />
                            </div>
                        </Link>
                        <Breakpoint
                            style={{ width: "100%" }}
                            customQuery="(max-width: 991px)"
                        >
                            <NavbarMenuMobileWithRouter
                                user={user}
                                isLoggedIn={isLoggedIn}
                            />
                        </Breakpoint>
                        <Breakpoint
                            style={{ width: "100%" }}
                            customQuery="(min-width: 992px)"
                        >
                            <NavbarMenuDesktop
                                user={user}
                                isLoggedIn={isLoggedIn}
                            />
                        </Breakpoint>
                    </div>
                </div>
            </Affix>
        </BreakpointProvider>
    );
};
export default withRouter(Navbar);

const NavbarMenuDesktop = props => {
    const [isAvatarDropDownVisible, setIsAvatarDropDownVisible] = useState(
        false
    );
    const { isLoggedIn } = props;
    return (
        <div className="navbar-menu">
            <div className="navbar-menu-inner">
                <div className="left-items">
                    <NavLink
                        exact
                        to="/"
                        activeClassName={"active"}
                        className="link"
                    >
                        Accueil
                    </NavLink>
                    <NavLink
                      exact
                      to="/game"
                      activeClassName={"active"}
                      className="link"
                    >
                        game
                    </NavLink>

                </div>
                {!isLoggedIn ? (
                    <div className={"right-items"}>
                        <NavLink
                            to="/signin"
                            activeClassName={"active"}
                            className="link"
                        >
                            Se connecter
                        </NavLink>
                        <NavLink
                            to="/signup"
                            activeClassName={"active"}
                            className="link filled-round"
                        >
                            Créer un compte
                        </NavLink>
                    </div>
                ) : null}


                {isLoggedIn ? (
                    <Popover
                        content={<DropdownAvatar />}
                        title="Mon compte"
                        trigger="click"
                        visible={isAvatarDropDownVisible}
                        onVisibleChange={() =>
                            setIsAvatarDropDownVisible(!isAvatarDropDownVisible)
                        }
                    >
                        <Avatar
                            src={`${process.env.MIX_APP_STORAGE_URL}${props.user.avatar}`}
                        />
                    </Popover>
                ) : null}
            </div>
        </div>
    );
};

const NavbarMenuMobile = props => {
    const [menuOpened, setMenuOpened] = useState(false);
    props.history.listen(() => {
        setMenuOpened(false);
    });

    const changeMenuStatus = () => {
        setMenuOpened(!menuOpened);
    };
    const onClose = () => {
        setMenuOpened(false);
    };
    return (
        <div className="navbar-options">
            <div>
                {!menuOpened ? (
                    <button
                        className={"icon-drawer-btn"}
                        onClick={changeMenuStatus}
                    >
                        <MenuIcon />
                    </button>
                ) : (
                    <button
                        className={"icon-drawer-btn"}
                        onClick={changeMenuStatus}
                    >
                        <CloseIcon />
                    </button>
                )}
            </div>
            <Drawer
                title="Menu"
                placement="right"
                onClose={onClose}
                closable={true}
                visible={menuOpened}
            >
                <NavbarMenuDesktop />
            </Drawer>
        </div>
    );
};
const NavbarMenuMobileWithRouter = withRouter(NavbarMenuMobile);

const DropdownAvatar = () => {
    return (
        <Menu>
            <Menu.Item key="0">
                <NavLink to="/my-space">Mon espace</NavLink>
            </Menu.Item>
            <Menu.Item key="3" onClick={() => dispatch(logout())}>
                Se déconnecter
            </Menu.Item>
        </Menu>
    );
};
