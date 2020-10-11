import React from "react";
import { View } from "react-native";

function Col(props) {
  const size = props.size.split(" ").map(size => "col-" + size).join(" ");

  return <View className={size} {...props} />;
}

export default Col;