"use client";

import Link from "next/link";
import { Layout, Menu, Button, Avatar, Divider } from "antd";
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
    <Header className="border-b h-fit">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center h-full">
        <Link href="/" className="justify-self-start">
          <GroupzyLogo />
        </Link>
        <div className="hidden md:inline col-start-2">
          <Menu
            className="border-none"
            mode="horizontal"
            disabledOverflow={true}
          >
            {menuItems.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link href={item.href}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </div>
        <div className="justify-self-end">
          <div className="md:hidden mr-4">
            <Button
              style={{ backgroundColor: "transparent" }}
              icon={<MenuOutlined style={{ backgroundColor: "transparent" }} />}
              onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
            />
          </div>
          {user ? (
            <Link href="/profile">
              <Avatar
                icon={<UserOutlined />}
                className="bg-gray-900 hover:bg-gray-500 text-white"
                size="middle"
              />
            </Link>
          ) : (
            <SignIn />
          )}
        </div>
      </div>
      {mobileMenuVisible && (
        <div className="md:hidden mt-2">
          <Menu mode="vertical" className="border">
            {menuItems.map((item, i) => (
              <>
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link href={item.href}>{item.label}</Link>
                </Menu.Item>
                {i !== menuItems.length - 1 ? (
                  <Divider type="horizontal" className="m-0" />
                ) : (
                  ""
                )}
              </>
            ))}
          </Menu>
        </div>
      )}
    </Header>
  );
}
