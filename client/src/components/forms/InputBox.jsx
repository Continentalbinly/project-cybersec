import React from "react";

const InputBox = ({
  inputTittle,
  autoComplete,
  keyboardType,
  secureTextEntry = false,
  value,
  setValue,
}) => {
  return (
    <div>
      <div className="text-[#FFF] font-bold">{inputTittle}</div>
      <div
        style={styles.inputBox}
        autoCorrect={false}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
    </div>
  );
};

export default InputBox;
