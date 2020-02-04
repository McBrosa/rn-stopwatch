import React from "react";
import { Layouts } from "../styles";
import { ListItem } from "react-native-elements";
import { StyleSheet, ScrollView } from "react-native";

const Lap = params => {
  const length = params.times.length;
  return (
    <ScrollView styles={styles.list}>
      {params.times.map((l, i) => (
        <ListItem
          key={i}
          title={`Lap ${length - i}`}
          subtitle={l.value}
          bottomDivider
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    ...Layouts.alignTop
  }
});

export default Lap;
