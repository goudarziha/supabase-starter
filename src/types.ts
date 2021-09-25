import * as dayjs from 'dayjs';

export interface IExerciseDifficulty {
  id: number;
  level: string;
}

export interface IExerciseType {
  id: number;
  type: string;
}

export interface IMuscle {
  id: number;
  name: string;
}

export interface IExerciseMovement {
  id: number;
  type: string;
}

export enum MovementType {
  PUSH = 'push',
  PULL = 'pull',
  DEADLIFT = 'deadlift',
  SQUAT = 'squat',
}

export interface ICommon {
  id: string;
  created_at?: dayjs.Dayjs;
  updated_at?: dayjs.Dayjs;
}

export interface IExercise extends ICommon {
  name: string;
  description: string;
  difficulty?: IExerciseDifficulty;
  exercise_type?: IExerciseType;
  movement?: MovementType;
  muscle?: IMuscle;
  muscle_group?: Array<IMuscle>;
}

export interface IWorkout extends ICommon {
  name: string;
  description: string;
  creator: IUserProfile;
  remix?: string;
  exercises?: Array<IRoutine>;
  comments?: Array<IComment>;
  remixes?: Array<IWorkout>;
  likes?: any;
  tags?: Array<ITag>;
  reviews?: Array<IReview>;
}

export interface IReview {
  id: string;
  review: string;
  reviewer: IUserProfile;
  rating: number;
}

export interface ITag {
  tag: string;
  id?: string;
}

export interface IComment extends ICommon {
  comment: string;
  workout?: IWorkout;
  commenter?: IUserProfile;
}

export interface IUser {
  id: string;
  aud: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  email: string;
  role: string;
  last_sign_in: string;
  updated_at: string;
}

export interface IUserProfile extends ICommon {
  description?: string;
  username?: string;
  avatar_url?: string;
  website?: string;
  name?: string;
  points?: number;
  city?: string;
  country?: ICountry;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  language?: string;
  currency?: string;
}

export interface ICountry {
  id: number;
  name: string;
  iso2: string;
  iso3: string;
  local_name?: string;
  continent: string;
}

export interface ICurrency {
  id: number;
  name: string;
  symbol: string;
}

export interface ILanguage {
  id: number;
  name: string;
}

export interface IRoutine extends ICommon {
  workout: string;
  exercise: IExercise;
  rep: number;
  set: number;
  weight: number;
  increment: number;
  rest?: number;
  day?: number;
}

export enum ToastTypes {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

export interface IRoutineForm {
  name: string;
  rep: string | number;
  set: string | number;
  weight: string | number;
  day: string | number;
  exercise: string;
  id?: string;
}

export interface IRoutineUpload {
  exercise: string;
  rep: string | number;
  set: string | number;
  weight: string | number;
  workout?: string;
  day: string | number;
  id?: string;
}
