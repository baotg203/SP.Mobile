//Add, Read, Update, Delete actions
import {
    collection, 
    doc, 
    setDoc, 
    addDoc, 
    getDoc,
    getDocs,
    deleteDoc,
    deleteField,
    updateDoc,
    where,
    query,
    onSnapshot,
} from 'firebase/firestore'


import {} from '@react-native-firebase/firestore'


//Ref
import {ref, uploadBytes, getDownloadURL, deleteObject} from 'firebase/storage'

//Database
import { database, store } from './fireBaseConfig'


export async function AddUser(Name, Pass){
    setDoc(doc(database, 'Users', Name),{
        Username: Name,
        Password: Pass,
        Name: '',
        Birth: 0,
        Gender: '',
        Interests: [],
        Bio: '',
        Matched: [],
        isOnline: false,
        validProfile: false
    })
}



export async function GetAllUser(){
    let Users=[]
    try{
    await getDocs(collection(database, 'Users'))
    .then(docs=>{
        docs.forEach((doc)=>{
            Users.push({...doc.data()})
        })
    })
        return Users
    }
    catch(error){
        console.log('error')
        return
    }
}


export async function GetUsers(condi){
    let result=[]
    const q=query(collection(database, 'Users'), where('Gender', '==', condi))
    const docs=await getDocs(q)
    docs.forEach((doc)=>{
        result.push(doc.data())
    })
    return result
}


export async function GetUser(username){
    try{
        return await getDoc(doc(database, 'Users',username))
    }
    catch(error){
        console.log('Get user error !')
        return 
    }
}



export async function GetAvatar(username){
    const reference=ref(store, `Avatars/${username}`)
    try{
        const result= await getDownloadURL(reference)
        console.log(result)
        return result
    }
    catch(error){
        alert('Lỗi ! Không thể tải avatar !')
        return 
    }
}


export async function UpdateUserProfile(user, validate){
    try{
        updateDoc(doc(database, 'Users', user.Username),{
            Name: user.Name,
            Birth: user.Birth,
            Gender:user.Gender,
            Interests: user.Interests,
            Bio: user.Bio,
            Location: user.Location,
            validProfile: validate
        })
        return true
    }
    catch(error){
        return false
    }
}


export async function UpdateUserGender(user, gender){
    try{
        updateDoc(doc(database, 'Users', user.Username),{
            Gender: gender
        })
        alert('Cập nhật thành công')
    }
    catch(error){
        alert('Lỗi ! Cập nhật thất bại')
    }
}



export async function UpdateUserInterests(user, interests){
    try{
        updateDoc(doc(database, 'Users', user.Username),{
            Interests: interests
        })
        alert('Cập nhật thành công')
    }
    catch(error){
        alert('Lỗi ! Cập nhật thất bại')
    }
}



export async function UpdateUserBio(user, bio){
    try{
        updateDoc(doc(database, 'Users', user.Username),{
            Bio: bio
        })
        alert('Cập nhật thành công')
    }
    catch(error){
        alert('Lỗi ! Cập nhật thất bại')
    }
}



export async function UpdateUserAvatar(user, avatar){
    const response=await fetch(avatar)
    const blob=await response.blob()
    const reference=ref(store, `Avatars/${user.Username}`)
    try{
        uploadBytes(reference, blob)
        return true
    }
    catch(error){
        console.log('Update failed !')
        return false
    }
}



export async function UpdateUserMatched(user, matched){
    try{
        updateDoc(doc(database, 'Users', user.Username),{
            Matched: matched
        })
    }
    catch(error){
        alert('Lỗi ! Cập nhật thất bại')
    }
}



export async function DeleterUser(user){
    try{
        deleteDoc(doc(database, 'Users', user.Username))
        alert('Xóa tài khoản thành công !')
    }
    catch(error){
        alert('Lỗi ! Xóa tài khoản thất bại !')
    }
}




export async function DeleteUserAvatar(user){
    const reference=ref(store, `Avatars/${user.Username}`)
    try{
        deleteObject(reference)
    }
    catch(error){
        console.log('Delete failed !')
    }
}


