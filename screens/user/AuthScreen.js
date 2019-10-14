import React, { useReducer, useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  View
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import * as authActions from "../../store/actions/auth";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";

const FORM_INPUT_UPDATE = "UPDATE";
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };

    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      ...state,
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities
    };
  }
};

const AuthScreen = props => {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: ""
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  const authHandler = () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }

    dispatch(action);
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, isValid) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="Email"
              keyboardType="email-address"
              required={true}
              email={true}
              autoCapitalize="none"
              errorText="Please enter a valid email address"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry={true}
              required={true}
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              <Button
                title={isSignup ? "Sign up" : "Login"}
                color={Colors.primary}
                onPress={authHandler}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? "Login" : "Sign up"}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignup(prev => !prev);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate"
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  gradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;
