// const updateTableWithFunction = async (dataObj: any) => {
//     try {
//         const { exercise, muscle } = dataObj;
//         const { data, error } = await supabase.rpc('manual_exercise_data', {
//             ex: exercise,
//             musc: muscle,
//         });
//         console.log(data);
//         console.log(error);
//     } catch (error) {
//         console.log(error);
//     }
// };

// const updateTable = async (table: string, dataObj: any) => {
//     try {
//         const { data, error } = await supabase.from(table).upsert(dataObj);
//         if (error) throw error;
//         if (data) {
//             console.log(data);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };

//   const getExerciseType = async (type: string) => {
//     try {
//       const { data, error } = await supabase
//         .from('exercise_type')
//         .select('id')
//         .eq('type', type)
//         .single();
//       if (error) throw error;
//       if (data) return data?.id;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const addExercise = async (exercise: any, type: number) => {
//     try {
//       const { data, error } = await supabase
//         .from('exercise')
//         .upsert([{ name: exercise, type }]);
//       if (error) throw error;
//       if (data) {
//         return _.get(data, [0, 'id']);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getMuscleId = async (muscle: string) => {
//     try {
//       const { data, error } = await supabase
//         .from('muscle')
//         .select('id')
//         .eq('name', muscle)
//         .single();
//       if (error) throw error;
//       if (data) {
//         return data?.id;
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const addSingleMuscleGroup = async (muscle: string, exercise: string) => {
//     try {
//       const { data, error } = await supabase
//         .from('muscle_group')
//         .insert([{ muscle, exercise }]);
//       if (error) throw error;
//       if (data) {
//         console.log(data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const sleep = (ms: number) => {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   };

//   const bigOp = () => {
//     setblah(blah + 1);
//     if (blah > 1) {
//       const exercises = _.get(data, ['data']);
//       exercises.forEach((exercise) => {
//         // console.log(exercise);
//         getExerciseType(exercise?.type?.toLowerCase()).then((typeId) => {
//           // console.log('TYPEID', typeId);
//           addExercise(exercise?.name, typeId).then((exerciseId) => {
//             // console.log('EXERCISEID', exerciseId);
//             const muscle_group = seperateStringToArr(exercise?.musclegroup);
//             // console.log(muscle_group);
//             muscle_group &&
//               muscle_group.length > 0 &&
//               muscle_group.forEach((m) => {
//                 // console.log('M', m);
//                 getMuscleId(m.toLowerCase()).then((muscleId) => {
//                   // console.log('msucleId', muscleId);
//                   // console.log('exerciseId', exerciseId);
//                   exerciseId &&
//                     addSingleMuscleGroup(muscleId, exerciseId).then((d) => {
//                       console.log('added', d);
//                     });
//                 });
//               });
//             // sleep(1000);
//           });
//         });
//       });
//     }
//   };
