import React from "react";
import ThemeItem from "./ThemeItem";
import { useEffect } from "react";
import { useResource } from "react-request-hook";


export default function ChangeTheme({ theme, setTheme }) {


  const [themes, getThemes] = useResource(() => ({
    url: "/themes",
    method: "get",
  }));

  const { data, isLoading } = themes;

  useEffect(getThemes, [getThemes]);


  function isActive(t) {
    return (
      t.primaryColor === theme.primaryColor &&
      t.secondaryColor === theme.secondaryColor
    );
  }
  return (
    <div>
      {isLoading && "Loading themes..."}
      Change theme:
      {data &&
        data.map((t, i) => (
          <ThemeItem
            key={"theme-" + i}
            theme={t}
            active={isActive(t)}
            onClick={() => setTheme(t)}
          />
        ))}{" "}
    </div>
  );
}
