import React, { useEffect } from "react";

const Meeting = ({ payload }) => {
  useEffect(() => {
    const startMeeting = async () => {
      const { ZoomMtg } = await import("@zoomus/websdk");

      // Set up the necessary Zoom Web SDK configurations
      ZoomMtg.setZoomJSLib("https://source.zoom.us/2.7.0/lib", "/av"); // Ensure the correct path
      ZoomMtg.preLoadWasm();
      ZoomMtg.prepareJssdk();

      // Generate the signature to authenticate
      ZoomMtg.generateSDKSignature({
        meetingNumber: payload.meetingNumber,
        role: payload.role, // 1 for host, 0 for attendee
        sdkKey: payload.sdkKey,
        sdkSecret: payload.sdkSecret,
        success: function (res) {
          ZoomMtg.init({
            leaveUrl: payload.leaveUrl,
            success: function () {
              // Join the meeting once init is successful
              ZoomMtg.join({
                meetingNumber: payload.meetingNumber,
                signature: res.result,
                sdkKey: payload.sdkKey,
                userName: payload.userName,
                userEmail: payload.userEmail,
                passWord: payload.passWord, // If the meeting has a password
                tk: "", // Optional token for registered meetings
                success: function () {
                  console.log("Joined Meeting Successfully");
                },
                error: function (error) {
                  console.log("Join Error", error);
                },
              });
            },
            error: function (error) {
              console.log("Init Error", error);
            },
          });
        },
        error: function (error) {
          console.log("Signature Generation Error", error);
        },
      });
    };

    // Call the async function to start the meeting
    startMeeting();
  }, [payload]);

  return <div>Meeting</div>;
};

export default Meeting;

// useEffect(async () => {
//   const { zoomMtg } = await import("@zoomus/websdk");

//   zoomMtg.setZoomJsLib("https://source.zoom.us/lib");

//   zoomMtg.preLoadWasm();
//   zoomMtg.prepareWebSDK();

//   zoomMtg.generateSDKSignature({
//     meetingNumber: payload.meetingNumber,
//     role: payload.role,
//     sdkKey: payload.sdkKey,
//     sdkSecret: payload.sdkSecret,
//     success: function (signature) {
//       ZoomMtg.init({
//         leaveUrl: payload.leaveUrl,
//         success: function (data) {
//           ZoomMtg.join({
//             meetingNumber: payload.meetingNumber,
//             signature: signature.result,
//             userName: payload.userName,
//             userEmail: payload.userEmail,
//             passWord: payload.passWord,
//             tk: "",
//             success: function () {
//               console.log("joined");
//             },
//           });
//         },
//         error: function (error) {
//           console.log(error);
//         },
//       });
//     },
//     error: function (error) {
//       console.log(error);
//     },
//   });
// }, []);

// return <div>Meeting</div>;
