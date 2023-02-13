import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import * as types from "../ActionTypes/rolesActionTypes";
import { addNewRoleError, addNewRolesuccess, deleteRoleError, deleteRolesuccess, loadRolesError, loadRolesSuccess, updateRoleError, updateRolesuccess } from "../Actions/rolesAction";
import { addRoleApi, deleteRoleApi, loadRolesApi, updateRoleApi } from "../APis/rolesApi";


export function* onLoadrolesStartAsync() {
    try {
        const response = yield call(loadRolesApi);
        console.log("LOAD USER ~~~>>>>", response.data)
        yield put(loadRolesSuccess(response.data));
        
    } catch (error) {
        yield put(loadRolesError(error.response));
    }
}


export function* onAddNewRoleStartAsync({ payload }) {
    try {
        const response = yield call(addRoleApi, payload);
        console.log("ADD NEW USER ~~~>>>>", response)
        yield put(addNewRolesuccess(response.data));
       
    } catch (error) {
        yield put(addNewRoleError(error.response));
    }
}

export function* onUpdateRoleStartAsync({ payload }) {
    console.log("UPDATE ROLE~~~<>>>",payload)
    try {
        const response = yield call(updateRoleApi, payload);
        console.log("UPDATE USER ~~~>>>>", response)
        yield put(updateRolesuccess(response.data));
       
    } catch (error) {
        yield put(updateRoleError(error.response));
    }
}

export function* onDeleteRoleStartAsync(user) {
    console.log("USER~~~~>>>",user)
    try {
        const response = yield call(deleteRoleApi, user.payload);
        console.log("Delete USER ~~~>>>>", response)
            yield put(deleteRolesuccess(response.data));
           
    } catch (error) {
        yield put(deleteRoleError(error.response));
    }
}

export function* onLoadRoles() {
    yield takeLatest(types.LOAD_ROLES_START, onLoadrolesStartAsync);
}

export function* onAddNewRole() {
    yield takeLatest(types.ADD_NEW_ROLE_START, onAddNewRoleStartAsync);
}

export function* onUpdateRole() {
    yield takeLatest(types.UPDATE_ROLE_START, onUpdateRoleStartAsync);
}

export function* onDeleteRole() {
    yield takeLatest(types.DELETE_ROLE_START, onDeleteRoleStartAsync);
}


const roleSagas = [
    fork(onLoadRoles), 
    fork(onAddNewRole),
    fork(onUpdateRole),
    fork(onDeleteRole), 
]

export default function* roleSaga() {
    yield all([...roleSagas]);
}
