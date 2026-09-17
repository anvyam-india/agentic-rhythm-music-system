export interface AcademyCamera {
  id: string
  name: string
  location: string
  status: 'Online' | 'Offline' | 'Maintenance'
  branchId: string
  branch: string
  lastEvent: string
}

export interface CameraDetection {
  id: string
  person: string
  role: 'teacher' | 'student' | 'staff' | 'unknown'
  camera: string
  location: string
  time: string
  confidence: number
  status: 'Active' | 'Left' | 'Alert' | 'Verified'
  branch: string
}

export interface CameraIncident {
  id: string
  type: string
  camera: string
  time: string
  description: string
  status: 'Resolved' | 'Investigating' | 'Notified'
  action: string
  branch: string
}

export const mockCameras: AcademyCamera[] = [
  {
    id: 'cam-1',
    name: 'South Bopal — Cam 01',
    location: 'Main Entrance',
    status: 'Online',
    branchId: 'br-south-bopal',
    branch: 'South Bopal',
    lastEvent: '1 min ago',
  },
  {
    id: 'cam-2',
    name: 'South Bopal — Cam 02',
    location: 'Reception',
    status: 'Online',
    branchId: 'br-south-bopal',
    branch: 'South Bopal',
    lastEvent: '30 sec ago',
  },
  {
    id: 'cam-3',
    name: 'South Bopal — Cam 03',
    location: 'Room 03 · Guitar',
    status: 'Online',
    branchId: 'br-south-bopal',
    branch: 'South Bopal',
    lastEvent: '2 min ago',
  },
  {
    id: 'cam-4',
    name: 'South Bopal — Cam 04',
    location: 'Practice Corridor',
    status: 'Online',
    branchId: 'br-south-bopal',
    branch: 'South Bopal',
    lastEvent: '45 sec ago',
  },
  {
    id: 'cam-5',
    name: 'South Bopal — Cam 05',
    location: 'Instrument Store',
    status: 'Online',
    branchId: 'br-south-bopal',
    branch: 'South Bopal',
    lastEvent: '8 min ago',
  },
  {
    id: 'cam-6',
    name: 'Prahlad Nagar — Cam 01',
    location: 'Entrance',
    status: 'Online',
    branchId: 'br-prahlad-nagar',
    branch: 'Prahlad Nagar',
    lastEvent: '3 min ago',
  },
  {
    id: 'cam-7',
    name: 'Prahlad Nagar — Cam 02',
    location: 'Classroom A',
    status: 'Maintenance',
    branchId: 'br-prahlad-nagar',
    branch: 'Prahlad Nagar',
    lastEvent: '2 hrs ago',
  },
  {
    id: 'cam-8',
    name: 'Bopal Cross — Cam 01',
    location: 'Lobby',
    status: 'Online',
    branchId: 'br-bopal-cross',
    branch: 'Bopal Cross Roads',
    lastEvent: '5 min ago',
  },
]

export const mockCameraDetections: CameraDetection[] = [
  {
    id: 'det-1',
    person: 'Jayesh Patel',
    role: 'teacher',
    camera: 'South Bopal — Cam 03',
    location: 'Room 03',
    time: '05:58 PM',
    confidence: 96,
    status: 'Active',
    branch: 'South Bopal',
  },
  {
    id: 'det-2',
    person: 'Aarav Patel',
    role: 'student',
    camera: 'South Bopal — Cam 01',
    location: 'Main Entrance',
    time: '05:52 PM',
    confidence: 94,
    status: 'Active',
    branch: 'South Bopal',
  },
  {
    id: 'det-3',
    person: 'Riya Mehta',
    role: 'teacher',
    camera: 'South Bopal — Cam 02',
    location: 'Reception',
    time: '05:40 PM',
    confidence: 91,
    status: 'Left',
    branch: 'South Bopal',
  },
  {
    id: 'det-4',
    person: 'Kabir Trivedi',
    role: 'student',
    camera: 'South Bopal — Cam 04',
    location: 'Practice Corridor',
    time: '05:35 PM',
    confidence: 89,
    status: 'Active',
    branch: 'South Bopal',
  },
  {
    id: 'det-5',
    person: 'Unknown visitor',
    role: 'unknown',
    camera: 'South Bopal — Cam 05',
    location: 'Instrument Store',
    time: '04:12 PM',
    confidence: 68,
    status: 'Alert',
    branch: 'South Bopal',
  },
  {
    id: 'det-6',
    person: 'Front desk — Meera',
    role: 'staff',
    camera: 'Prahlad Nagar — Cam 01',
    location: 'Entrance',
    time: '04:05 PM',
    confidence: 93,
    status: 'Verified',
    branch: 'Prahlad Nagar',
  },
]

export const mockCameraIncidents: CameraIncident[] = [
  {
    id: 'inc-1',
    type: 'Restricted Zone',
    camera: 'South Bopal — Cam 05',
    time: '04:12 PM',
    description: 'Unknown person near instrument store without staff escort',
    status: 'Investigating',
    action: 'Admin notified',
    branch: 'South Bopal',
  },
  {
    id: 'inc-2',
    type: 'After Hours',
    camera: 'Prahlad Nagar — Cam 01',
    time: '10:22 PM',
    description: 'Motion detected after academy closing hours',
    status: 'Notified',
    action: 'Security WhatsApp alert',
    branch: 'Prahlad Nagar',
  },
  {
    id: 'inc-3',
    type: 'Crowd Spike',
    camera: 'South Bopal — Cam 01',
    time: '05:50 PM',
    description: 'Evening class rush — queue at entrance',
    status: 'Resolved',
    action: 'Reception staff deployed',
    branch: 'South Bopal',
  },
]

export const mockCameraZones = [
  { zone: 'Instrument Store', branch: 'South Bopal', access: 'Staff only', alerts: 1, status: 'Active' },
  { zone: 'Cash / Fees Desk', branch: 'All Branches', access: 'Authorized only', alerts: 0, status: 'Active' },
  { zone: 'Practice Rooms', branch: 'South Bopal', access: 'Students + teachers', alerts: 0, status: 'Monitored' },
  { zone: 'After Hours — All', branch: 'All Branches', access: 'No access', alerts: 1, status: 'Armed' },
]
