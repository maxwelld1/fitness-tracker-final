import { api, Globals } from './api';

export async function AddWorkout(data) {
  const x = await api('workouts', data);
  return x;
}

export async function GetWorkouts(date) {
  const x = await api(`workouts/getFromDate/${Globals.user.id}/${date}`);
  return x;
}

export async function GetPartialExercise(exercise) {
  const x = await api(`workouts/getPartial/${Globals.user.id}/${exercise}`);
  return x;
}
