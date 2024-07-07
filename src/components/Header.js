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
    {
      key: "stats",
      icon: <NumberOutlined />,
      label: "Stats",
      href: "/stats",
    },
  ];

  return (
    <Header className="border-b p-0 h-auto">
      <div className="flex justify-between items-center h-16 px-4 md:px-8">
        <Link href="/" className="flex items-center">
          <GroupzyLogo />
        </Link>
        <div className="hidden md:block">
          <Menu
            className="border-none bg-transparent"
            mode="horizontal"
            disabledOverflow={true}
            selectable={false}
          >
            {menuItems.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link href={item.href}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </div>
        <div className="flex items-center">
          {user ? <SignOut /> : <SignIn />}
          <div className="md:hidden m-4">
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
            />
          </div>
        </div>
      </div>
      {mobileMenuVisible && (
        <div className="md:hidden">
          <Menu mode="vertical" className="border-none">
            {menuItems.map((item, i) => (
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
