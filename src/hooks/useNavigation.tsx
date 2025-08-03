import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {AppStackParamList, AuthStackParamList} from '../types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export function useAppNavigation<T extends keyof AppStackParamList>() {
  return useNavigation<NativeStackNavigationProp<AppStackParamList, T>>();
}
export function useAppRoute<T extends keyof AppStackParamList>() {
  return useRoute<RouteProp<AppStackParamList, T>>();
}

export function useAuthNavigation<T extends keyof AuthStackParamList>() {
  return useNavigation<NativeStackNavigationProp<AuthStackParamList, T>>();
}
export function useAuthRoute<T extends keyof AuthStackParamList>() {
  return useRoute<RouteProp<AuthStackParamList, T>>();
}
