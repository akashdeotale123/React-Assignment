import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import * as types from "../ActionTypes/usersActionTypes";
import {  addNewUserError, addNewUserSuccess,  deleteUserError, deleteUserSuccess, loadUsersError, loadUsersSuccess, updateUserError, updateUserSuccess } from "../Actions/usersAction";
import { adduserApi, deleteUserApi, loadUsersApi, updateUserApi } from "../APis/usersApi";


export function* onLoadUsersStartAsync() {
    try {
        const response = yield call(loadUsersApi);
        yield put(loadUsersSuccess(response.data));
        
    } catch (error) {
        yield put(loadUsersError(error.response));
    }
}


export function* onAddNewUserStartAsync({ payload }) {
    try {
        const response = yield call(adduserApi, payload);
        console.log("ADD NEW USER ~~~>>>>", response)
        yield put(addNewUserSuccess(response.data));
       
    } catch (error) {
        yield put(addNewUserError(error.response));
    }
}

export function* onUpdateUserStartAsync({ payload }) {
    try {
        const response = yield call(updateUserApi, payload);
        console.log("UPDATE USER ~~~>>>>", response)
        yield put(updateUserSuccess(response.data));
       
    } catch (error) {
        yield put(updateUserError(error.response));
    }
}

export function* onDeleteUserStartAsync(user) {
    try {
        const response = yield call(deleteUserApi, user.payload);
            yield put(deleteUserSuccess(response.data));
           
    } catch (error) {
        yield put(deleteUserError(error.response));
    }
}

export function* onLoadUsers() {
    yield takeLatest(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

export function* onAddNewUser() {
    yield takeLatest(types.ADD_NEW_USER_START, onAddNewUserStartAsync);
}

export function* onUpdateUser() {
    yield takeLatest(types.UPDATE_USER_START, onUpdateUserStartAsync);
}

export function* onDeleteUser() {
    yield takeLatest(types.DELETE_USER_START, onDeleteUserStartAsync);
}


const userSagas = [
    fork(onLoadUsers), 
    fork(onAddNewUser),
    fork(onUpdateUser),
    fork(onDeleteUser), 
]

export default function* userSaga() {
    yield all([...userSagas]);
}
