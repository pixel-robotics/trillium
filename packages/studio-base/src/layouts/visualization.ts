
export const visualization = {
  configById: {
    "3D!18i6zy7": {
      layers: {
        "845139cb-26bc-40b3-8161-8ab60af4baf5": {
          visible: true,
          frameLocked: true,
          label: "Grid",
          instanceId: "845139cb-26bc-40b3-8161-8ab60af4baf5",
          layerId: "foxglove.Grid",
          size: 10,
          divisions: 10,
          lineWidth: 1,
          color: "#248eff",
          position: [0, 0, 0],
          rotation: [0, 0, 0],
          order: 1
        }
      },
      cameraState: {
        distance: 20,
        perspective: true,
        phi: 60,
        target: [0, 0, 0],
        targetOffset: [0, 0, 0],
        targetOrientation: [0, 0, 0, 1],
        thetaOffset: 45,
        fovy: 45,
        near: 0.5,
        far: 5000
      },
      followMode: "follow-pose",
      scene: {},
      transforms: {
        "frame:pallet_front_right": { visible: true },
        "frame:pallet_front_left": { visible: true },
        "frame:pallet_front_center": { visible: true },
        "frame:pallet_adjusted": { visible: true },
        "frame:map": { visible: true },
        "frame:fork_upper_link": { visible: false },
        "frame:base_link": { visible: false },
        "frame:left_wheel_link": { visible: false },
        "frame:right_wheel_link": { visible: false },
        "frame:steering_link": { visible: false },
        "frame:wheel_front_link": { visible: false },
        "frame:odom": { visible: false },
        "frame:27271_1": { visible: false },
        "frame:48480_1": { visible: false },
        "frame:41873_1": { visible: false },
        "frame:realsense_left_depth_frame": { visible: false },
        "frame:realsense_left_link": { visible: false },
        "frame:realsense_left_depth_optical_frame": { visible: false },
        "frame:realsense_left_color_frame": { visible: false },
        "frame:realsense_left_color_optical_frame": { visible: false },
        "frame:realsense_front_depth_frame": { visible: false },
        "frame:realsense_front_link": { visible: false },
        "frame:realsense_front_depth_optical_frame": { visible: false },
        "frame:realsense_front_color_frame": { visible: false },
        "frame:realsense_front_color_optical_frame": { visible: false },
        "frame:backward_lidar": { visible: false },
        "frame:camera_calibration_base": { visible: false },
        "frame:forward_lidar": { visible: false },
        "frame:induction_sensor": { visible: false },
        "frame:marker": { visible: false },
        "frame:realsense_left_calibration_link": { visible: false },
        "frame:realsense_right_calibration_link": { visible: false },
        "frame:basler_bottom_link": { visible: false },
        "frame:basler_top_corrected_link": { visible: false },
        "frame:basler_top_link": { visible: false },
        "frame:load_sensor": { visible: false },
        "frame:realsense_front_bottom_screw_frame": { visible: false },
        "frame:realsense_left_bottom_screw_frame": { visible: false },
        "frame:realsense_right_bottom_screw_frame": { visible: false },
        "frame:realsense_right_link": { visible: false },
        "frame:spectator_camera_link": { visible: false },
        "frame:realsense_right_depth_frame": { visible: false },
        "frame:realsense_right_depth_optical_frame": { visible: false },
        "frame:realsense_right_color_frame": { visible: false },
        "frame:realsense_right_color_optical_frame": { visible: false },
        "frame:pallet_center_translation": { visible: false },
        "frame:goal_between_markers": { visible: false },
        "frame:pallet_center_goal": { visible: false },
        "frame:apriltag_realsense_right/160": { visible: false },
        "frame:apriltag_realsense_left/160": { visible: false },
        "frame:apriltag_realsense_left/159": { visible: false },
        "frame:platform_marker_left": { visible: false },
        "frame:platform_marker_right": { visible: false },
        "frame:pallet_center_debug": { visible: false }
      },
      topics: {
        "/robot_description": {
          visible: true
        },
        "/forward_lidar": {
          visible: true,
          colorField: "intensity",
          colorMode: "colormap",
          colorMap: "turbo"
        },
        "/backward_lidar": {
          visible: true,
          colorField: "intensity",
          colorMode: "colormap",
          colorMap: "turbo"
        }
      },
      publish: {
        type: "point",
        poseTopic: "/move_base_simple/goal",
        pointTopic: "/clicked_point",
        poseEstimateTopic: "/initialpose",
        poseEstimateXDeviation: 0.5,
        poseEstimateYDeviation: 0.5,
        poseEstimateThetaDeviation: 0.26179939
      },
      imageMode: {}
    },
    "RawMessages!os6rgs": {},
    "Image!3mnp456": {}
  },
  globalVariables: {},
  userNodes: {},
  layout: "3D!18i6zy7"
};
