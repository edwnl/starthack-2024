"use client";

import Link from "next/link";
import { Layout, Menu, Button, Avatar } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  TrophyOutlined,
  PlusCircleOutlined,
  LoginOutlined,
  LogoutOutlined,
  ProfileOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/contexts/AuthContext";
import SignIn from "./GoogleSignIn";
import GroupzyLogo from "./GroupzyLogo";
import SignOut from "./GoogleSignOut";
import { useState } from "react";

const { Header } = Layout;

export default function AppHeader() {
  const { user } = useAuth();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const menuItems = [
    {
      key: "friends",
      icon: <TeamOutlined />,
      label: "Friends",
      href: "/friends",
    },
    {
      key: "leaderboard",
      icon: <TrophyOutlined />,
      label: "Leaderboard",
      href: "/leaderboard",
    },
    {
      key: "create",
      icon: <PlusCircleOutlined />,
      label: "Create Group",
      href: "/create-group",
    },
  ];

  return (
    <Header className="px-4">
      <div className="flex justify-between items-center w-full h-full">
        <Link href="/" className="flex-shrink-0">
          <GroupzyLogo />
        </Link>
        <div className="hidden sm:flex flex-grow justify-center">
          <Menu
            theme="light"
            mode={"horizontal"}
            className="border-0"
            disabledOverflow={true}
          >
            {menuItems.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link href={item.href}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </div>
        <div className="flex items-center">
          <div className="sm:hidden mr-4">
            <Button
              icon={<MenuOutlined />}
              onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
            />
          </div>
          {user ? (
            <Link href="/profile" className="flex-shrink-0">
              <Avatar
                icon={<UserOutlined />}
                className="bg-gray-900 text-white"
                size="middle"
              />
            </Link>
          ) : (
            <SignIn />
          )}
        </div>
      </div>
      {mobileMenuVisible && (
        <div className="sm:hidden mt-2">
          <Menu theme="light" mode="vertical">
            {menuItems.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link href={item.href}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </div>
      )}
    </Header>
  );
}
