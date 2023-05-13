export const updateUserName="Update_Username"
export const updateName="Update_Name"
export const updateBirth="Update_Birth"
export const updateGender="Update_Gender"
export const updateInterests="Update_Interests"
export const updateBio="Update_Bio"
export const updateUser='Update_User'
export const updateAvatar='Update_Avatar'
export const updateMatched='Update_Matched'
export const updateLocation='Update_Location'

export const User={
    Username: '',
    Name: '',
    Birth: 0,
    Gender: '',
    Interests: [],
    Bio: '',
    Avatar: '',
    Location: '',
    Matched: []
}

export default function updateEmailReducer(state=User, action){
    switch(action.type){
        case updateUserName:
            return{
                ...state,
                Username: action.payload
            }
        case updateName:
            return{
                ...state,
                Name: action.payload
            }
        case updateBirth:
            return{
                ...state,
                Birth: action.payload
            }
        case updateGender:
            return{
                ...state,
                Gender: action.payload
            }
        case updateInterests:
            return{
                ...state,
                Interests: action.payload
            }
        case updateBio:
            return{
                ...state,
                Bio: action.payload
            }
        case updateAvatar:
            return{
                ...state,
                Avatar: action.payload
            } 
        case updateMatched:
            return{
                ...state,
                Matched: action.payload
            }
        case updateLocation:
            return{
                ...state,
                Location: action.payload
            }   
        case updateUser:
            return{
                Username: action.payload.Username,
                Name: action.payload.Name,
                Birth: action.payload.Birth,
                Gender: action.payload.Gender,
                Interests: action.payload.Interests,
                Bio: action.payload.Bio,
                Avatar: action.payload.Avatar,
                Location: action.payload.Location,
                Matched: action.payload.Matched
            }
        default:
            return state
    }
}