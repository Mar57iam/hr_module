'use client';
import React, { useState, useEffect, useContext } from 'react';
import { FaClock, FaMapMarkerAlt, FaUndo } from 'react-icons/fa';
import { AuthContext } from '@/Context/AuthContext';

export default function AttendencePage() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [attendanceData, setAttendanceData] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const savedAddress = localStorage.getItem('address');
    const savedClockStatus = localStorage.getItem('isClockedIn');
    const savedLocation = localStorage.getItem('location');
    const savedAttendance = localStorage.getItem('attendanceData');

    if (savedAddress) setAddress(savedAddress);
    if (savedClockStatus) setIsClockedIn(savedClockStatus === 'true');
    if (savedLocation) setLocation(JSON.parse(savedLocation));
    if (savedAttendance) setAttendanceData(JSON.parse(savedAttendance));

    fetchAttendanceFromAPI();
  }, []);

 
  const fetchAttendanceFromAPI = async () => {
    try {
      const res = await fetch(
        'https://site46339-a7pcm8.scloudsite101.com/api/attendance/today',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (data.attendanceCheck) {
        setAttendanceData(data.attendanceCheck);
        localStorage.setItem('attendanceData', JSON.stringify(data.attendanceCheck));
        setIsClockedIn(!!data.attendanceCheck.check_in && !data.attendanceCheck.check_out);
      }
    } catch (err) {
      console.error('Error fetching attendance:', err);
    }
  };

  const getAddressFromCoords = async (latitude, longitude) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await res.json();
      return data.display_name || 'Address not found';
    } catch (err) {
      console.error('Error getting address:', err);
      return 'Address not found';
    }
  };

  const handleClock = () => {
    if (!navigator.geolocation) {
      setMessage('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation({ latitude, longitude });
        localStorage.setItem('location', JSON.stringify({ latitude, longitude }));

        const fetchedAddress = await getAddressFromCoords(latitude, longitude);
        setAddress(fetchedAddress);
        localStorage.setItem('address', fetchedAddress);

        try {
          const response = await fetch(
            'https://site46339-a7pcm8.scloudsite101.com/api/attendance',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ latitude, longitude, address: fetchedAddress }),
            }
          );

          const data = await response.json();
          console.log(data);

          setMessage(data.message || 'Attendance recorded successfully');
          setAttendanceData(data.attendanceCheck || null);
          localStorage.setItem('attendanceData', JSON.stringify(data.attendanceCheck || {}));

          if (data.chock === 'Chock In') {
            setIsClockedIn(true);
            localStorage.setItem('isClockedIn', 'true');
          } else if (data.chock === 'Chock Out') {
            setIsClockedIn(false);
            localStorage.setItem('isClockedIn', 'false');
          }
        } catch (error) {
          setMessage('Error connecting to server');
          console.error(error);
        }

        setLoading(false);
      },
      () => {
        setMessage('Unable to retrieve your location');
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen md:ml-[250px] bg-white py-10 px-6 md:px-20">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Employee Time Clock</h2>
      <p className="text-gray-500 mb-10">Track your work hours and breaks</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Status */}
        <div className="border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="font-medium text-gray-800">Status</p>
            <FaClock className="text-gray-400" />
          </div>
          <span className="inline-block bg-gray-200 text-sm font-medium text-gray-700 px-3 py-1 rounded-lg w-max">
            {attendanceData?.status || (isClockedIn ? 'Clocked In' : 'Clocked Out')}
          </span>
        </div>

        {/* Location */}
        <div className="border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="font-medium text-gray-800">Location</p>
            <FaMapMarkerAlt className="text-gray-400" />
          </div>
          <div className="text-sm text-gray-500">
            {address ? <span className="text-gray-600">{address}</span> : 'No address data'}
          </div>
        </div>

        {/* Times */}
        <div className="border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="font-medium text-gray-800">Today</p>
            <FaUndo className="text-gray-400" />
          </div>
          <p className="text-sm text-gray-500">
            <strong>Date:</strong> {attendanceData?.date || '—'}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Clock In:</strong> {attendanceData?.check_in || '—'}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Clock Out:</strong> {attendanceData?.check_out || '—'}
          </p>
        </div>
      </div>

      <div className="border border-gray-100 rounded-xl p-8 shadow-sm max-w-3xl mx-auto">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Time Clock</h3>
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleClock}
            disabled={loading}
            className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-lg font-semibold"
          >
            <FaClock />
            {loading ? 'Processing...' : isClockedIn ? 'Clock Out' : 'Clock In'}
          </button>
        </div>
        {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  );
}


