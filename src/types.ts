// userSlice
export interface MemberInfoType {
  pid: number;
  id: string;
  name: string;
  nickName: string;
  email: string;
  address: string;
  phone: string;
  regiDate: string;
  role: string;
  profileImg: string;
}

export interface UserStateType {
  isLoading: boolean;
  isLogin: boolean;
  isLoginError: boolean;
  isClearing: boolean;
  isClear: boolean;
  isClearError?: string; //로그아웃 에러
  data: {
    message: string; //서버에서 오는 상태 메세지
    token: string; //엑세스 토큰
    refreshToken: string; //리프레시 토큰
    memberInfo: MemberInfoType | null; //서버에서 받아오는 유저정보
  };
}

export interface LoginInputType {
  id: string;
  password: string;
}
