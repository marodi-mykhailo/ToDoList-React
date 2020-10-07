import React from 'react'
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "../ReduxStoreProviderDecorator";


export default {
    title: 'AppWithRedux Stories',
    decorators: [ReduxStoreProviderDecorator]
}


export const AppWithReduxBaseExample = (props: any) => {
    return (
        <AppWithRedux/>
    )
}
