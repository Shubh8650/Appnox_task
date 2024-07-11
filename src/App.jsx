import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { MailOutlined } from "@ant-design/icons";

const App = () => {
  let ApiEndPoint = "http://appnox-tm.it/api/login";
  const [menuElements, setMenuElements] = useState([]);

  const manipulateResponse = (menu) => {
    if (menu) {
      let modifiedMenu = menu.map((el, index) => {
        return {
          label: el.condition,
          key: index,
          icon: <MailOutlined />,
        };
      });
      setMenuElements(modifiedMenu);
    }
  };

  const fetchMenuData = async () => {
    const loginResponse = await fetch(ApiEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: "AdminPro",
        password: "Mnop@1234",
      }),
    });

    const loginData = await loginResponse.json();
    let accessToken = loginData.result.key;

    const menuResponse = await fetch("http://appnox-tm.it/api/v1/menu", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const menuData = await menuResponse.json();
    const menu = menuData.result.data;
    manipulateResponse(menu);
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  const onClick = (e) => {
    console.log("click ", e);
  };

  return (
    <div className="App">
      <Menu
        onClick={onClick}
        mode="vertical"
        theme="dark"
        items={menuElements}
      />
    </div>
  );
};

export default App;
