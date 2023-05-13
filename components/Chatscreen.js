import React, { useState } from 'react';
import { windowHeight, windowWidth } from "../screens/Authentication/Authentication"
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

export function ChatScreen(){
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello' },
    { id: '2', text: 'How are you?' },
    { id: '3', text: 'I am fine, thank you!' },
  ]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      setMessages([
        ...messages,
        { id: Math.random().toString(), text: message },
      ]);
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.messagesContainer}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.message}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message"
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: windowWidth, 
    height: windowHeight*0.7, 
    marginTop: windowHeight*0.15,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  message: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#e5e5ea',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: 'blue',
    borderRadius: 20,
    padding: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

