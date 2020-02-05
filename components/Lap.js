import React from "react";
import { Colors } from "../styles";
import { ListItem } from "react-native-elements";
import { ScrollView } from "react-native";

const Lap = params => {
  const length = params.times.length;
  return (
    <ScrollView>
      {params.times.map((l, i) => (
        <ListItem
          key={i}
          title={`Lap ${length - i}`}
          subtitle={l.value}
          containerStyle={{
            backgroundColor: Colors.clear
          }}
          contentContainerStyle={{
            flex: 1,
            alignItems: "center"
          }}
          subtitleStyle={{
            fontSize: 30,
            color: Colors.whitePurp
          }}
          titleStyle={{
            fontWeight: "bold",
            color: Colors.whitePurp
          }}
        />
      ))}
    </ScrollView>
  );
};

export default Lap;
