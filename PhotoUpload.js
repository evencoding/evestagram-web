// const UPLOAD_PHOTO = gql`
//   mutation uploadPhoto($file: Upload!, $caption: String) {
//     uploadPhoto(file: $file, caption: $caption) {
//       id
//       user
//       file
//       caption
//       likes
//       comments
//     }
//   }
// `;

// const photoUploadFn = () => {
//   const onCompletedd = () => console.log("Finish");
//   const [uploadPhoto] = useMutation(UPLOAD_PHOTO, {
//     onCompleted: onCompletedd,
//   });
//   const onSubmitValidd = async (e) => {
//     e.preventDefault();
//     const file = e.target[0].files[0];
//     const caption = e.target[1]?.value;
//     console.log(file);
//     await uploadPhoto({
//       variables: {
//         file,
//         caption,
//       },
//     });
//   };
// };

// function PhotoUpload() {
//   return (
//     <div>
//       <form onSubmit={onSubmitValidd}>
//         <input {...register} name="file" type="file" />
//         <input {...register} name="caption" type="text" />
//         <input type="submit" />
//       </form>
//     </div>
//   );
// }
