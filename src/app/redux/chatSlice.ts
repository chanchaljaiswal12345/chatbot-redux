import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
  messages: Message[];
}

interface Message {
  text: string;
  sender: string;
}

const initialState: ChatState = {
  messages: [{ text: "Hello I AI, how can I help you", sender: "ai" }],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
