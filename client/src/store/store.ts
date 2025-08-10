import {configureStore, createSlice} from '@reduxjs/toolkit';




const demoslice = createSlice ({
     name: 'demo',
     initialState: ['demo'],
     reducers: {}
})



export const store = configureStore ({
     reducer: {
          demo: demoslice.reducer
     }
});



export type RootState = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch 