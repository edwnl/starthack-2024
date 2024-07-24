"use client";

import Link from "next/link";
import { Layout, Menu, Button, Divider } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  TrophyOutlined,
  PlusCircleOutlined,
  LoginOutlined,
  LogoutOutlined,
  ProfileOutlined,
  MenuOutlined,
  NumberOutlined,
  ClockCircleOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/contexts/AuthContext";
import SignIn from "./GoogleSignIn";
import GroupzyLogo from "./GroupzyLogo";
import SignOut from "./GoogleSignOut";
import { useState, useEffect } from "react";
import { getActiveSession } from "@/app/active-session/actions";
import { useActiveSession } from "@/contexts/ActiveSessionContext";

const { Header } = Layout;

export default function AppHeader() {
  const { user } = useAuth();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const { hasActiveSession } = useActiveSession();

  const menuItems = [
    {
      key: "social",
      icon: <GlobalOutlined />,
      label: "Social",
      href: "/social",
      bold: false,
    },
    {
      key: "friends",
      icon: <TeamOutlined />,
      label: "Friends",
      href: "/friends",
      bold: false,
    },
    {
      key: "leaderboard",
      icon: <TrophyOutlined />,
      label: "Leaderboard",
      href: "/leaderboard",
      bold: false,
    },
    {
      key: "create",
      icon: <PlusCircleOutlined />,
      label: "Create Group",
      href: "/create-group",
      bold: false,
    },
    {
      key: "stats",
      icon: <NumberOutlined />,
      label: "Stats",
      href: "/stats",
      bold: false,
    },
  ];

  if (hasActiveSession) {
    menuItems.push({
      key: "active-session",
      icon: <ClockCircleOutlined />,
      label: "Active Session",
      href: "/active-session",
      bold: true,
    });
  }

  const renderMenuItem = (item) => (
    <Menu.Item key={item.key} icon={item.icon}>
      <Link href={item.href} onClick={() => setMobileMenuVisible(false)}>
        <span className={item.bold ? "font-bold" : ""}>{item.label}</span>
      </Link>
    </Menu.Item>
  );

  return (
    <Header className="border-b p-0 h-auto">
      <div className="flex justify-between items-center h-16 px-4 md:px-8">
        <Link
          href="/"
          className="flex items-center"
          onClick={() => setMobileMenuVisible(false)}
        >
          <GroupzyLogo />
        </Link>
        <div className="hidden lg:block">
          <Menu
            className="border-none bg-transparent"
            mode="horizontal"
            disabledOverflow={true}
            selectable={false}
          >
            {menuItems.map(renderMenuItem)}
          </Menu>
        </div>
        <div className="flex items-center">
          {user ? <SignOut /> : <SignIn />}
          <div className="lg:hidden m-4">
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
            />
          </div>
        </div>
      </div>
      {mobileMenuVisible && (
        <div className="lg:hidden">
          <Menu mode="vertical" className="border-none">
            {menuItems.map(renderMenuItem)}
          </Menu>
        </div>
      )}
    </Header>
  );
}
