import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Chip
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  Calendar as CalendarIcon
} from 'lucide-react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import './calender.scss';

// Date formatting utilities
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Initial mock data
const initialMeetings = [
  {
    id: 1,
    title: 'Team Standup',
    date: new Date(2025, 3, 18), // April 18, 2025
    startTime: new Date(2025, 3, 18, 9, 0), // 9:00 AM
    endTime: new Date(2025, 3, 18, 9, 30), // 9:30 AM
    description: 'Daily team standup meeting',
    attendees: ['John Doe', 'Jane Smith'],
    location: 'Conference Room A'
  },
  {
    id: 2,
    title: 'Project Review',
    date: new Date(2025, 3, 18), // April 18, 2025
    startTime: new Date(2025, 3, 18, 14, 0), // 2:00 PM
    endTime: new Date(2025, 3, 18, 15, 0), // 3:00 PM
    description: 'Monthly project review with stakeholders',
    attendees: ['John Doe', 'Michael Johnson', 'Jane Smith'],
    location: 'Main Boardroom'
  },
  {
    id: 3,
    title: 'Client Meeting',
    date: new Date(2025, 3, 19), // April 19, 2025
    startTime: new Date(2025, 3, 19, 11, 0), // 11:00 AM
    endTime: new Date(2025, 3, 19, 12, 0), // 12:00 PM
    description: 'Discuss new requirements with client',
    attendees: ['Jane Smith', 'Michael Johnson'],
    location: 'Virtual - Zoom'
  }
];

export default function MeetingCalendarView() {
  const [meetings, setMeetings] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // 'day', 'week', 'month'
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState({
    id: null,
    title: '',
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(new Date().setHours(new Date().getHours() + 1)),
    description: '',
    attendees: [],
    location: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newAttendee, setNewAttendee] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Load meetings from localStorage on component mount
  useEffect(() => {
    const storedMeetings = localStorage.getItem('meetings');
    if (storedMeetings) {
      // Convert string dates back to Date objects
      const parsedMeetings = JSON.parse(storedMeetings, (key, value) => {
        if (['date', 'startTime', 'endTime'].includes(key) && value) {
          return new Date(value);
        }
        return value;
      });
      setMeetings(parsedMeetings);
    } else {
      // Initialize with default data if no stored meetings
      setMeetings(initialMeetings);
      saveMeetingsToLocalStorage(initialMeetings);
    }
  }, []);

  // Save meetings to localStorage
  const saveMeetingsToLocalStorage = (meetingsToSave) => {
    localStorage.setItem('meetings', JSON.stringify(meetingsToSave));
  };

  // Get days in month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week (0 = Sunday, 6 = Saturday)
  const getDayOfWeek = (date) => {
    return date.getDay();
  };

  // Generate days for month view
  const generateMonthDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentYear, currentMonth, i));
    }
    
    return days;
  };

  // Generate days for week view
  const generateWeekDays = () => {
    const currentDay = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const days = [];
    
    // Start with Sunday of current week
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - currentDay);
    
    // Generate 7 days (Sunday to Saturday)
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    
    return days;
  };

  // Get meetings for a specific date
  const getMeetingsForDate = (date) => {
    if (!date) return [];
    
    return meetings.filter(meeting => {
      const meetingDate = new Date(meeting.date);
      return (
        meetingDate.getDate() === date.getDate() &&
        meetingDate.getMonth() === date.getMonth() &&
        meetingDate.getFullYear() === date.getFullYear()
      );
    }).sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  };

  // Navigate to previous period
  const goToPrevious = () => {
    if (viewMode === 'day') {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - 1);
      setCurrentDate(newDate);
    } else if (viewMode === 'week') {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - 7);
      setCurrentDate(newDate);
    } else if (viewMode === 'month') {
      setCurrentMonth(prev => {
        if (prev === 0) {
          setCurrentYear(prevYear => prevYear - 1);
          return 11;
        }
        return prev - 1;
      });
    }
  };

  // Navigate to next period
  const goToNext = () => {
    if (viewMode === 'day') {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + 1);
      setCurrentDate(newDate);
    } else if (viewMode === 'week') {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + 7);
      setCurrentDate(newDate);
    } else if (viewMode === 'month') {
      setCurrentMonth(prev => {
        if (prev === 11) {
          setCurrentYear(prevYear => prevYear + 1);
          return 0;
        }
        return prev + 1;
      });
    }
  };

  // Handle opening dialog for add/edit
  const handleOpenDialog = (meeting = null, edit = false) => {
    if (edit && meeting) {
      setCurrentMeeting({
        ...meeting,
        date: new Date(meeting.date),
        startTime: new Date(meeting.startTime),
        endTime: new Date(meeting.endTime)
      });
      setIsEditing(true);
    } else {
      setCurrentMeeting({
        id: null,
        title: '',
        date: new Date(),
        startTime: new Date(),
        endTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        description: '',
        attendees: [],
        location: ''
      });
      setIsEditing(false);
    }
    setDialogOpen(true);
  };

  // Handle closing dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentMeeting({ ...currentMeeting, [name]: value });
  };

  // Handle date change
  const handleDateChange = (newDate) => {
    setCurrentMeeting({ ...currentMeeting, date: newDate });
  };

  // Handle time change
  const handleTimeChange = (timeType, newTime) => {
    setCurrentMeeting({ ...currentMeeting, [timeType]: newTime });
  };

  // Handle adding attendee
  const handleAddAttendee = () => {
    if (newAttendee.trim() !== '' && !currentMeeting.attendees.includes(newAttendee.trim())) {
      setCurrentMeeting({
        ...currentMeeting,
        attendees: [...currentMeeting.attendees, newAttendee.trim()]
      });
      setNewAttendee('');
    }
  };

  // Handle removing attendee
  const handleRemoveAttendee = (attendee) => {
    setCurrentMeeting({
      ...currentMeeting,
      attendees: currentMeeting.attendees.filter(a => a !== attendee)
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!currentMeeting.title.trim()) {
      setSnackbar({ open: true, message: 'Meeting title is required', severity: 'error' });
      return;
    }

    if (isEditing) {
      // Update existing meeting
      const updatedMeetings = meetings.map(meeting => 
        meeting.id === currentMeeting.id ? currentMeeting : meeting
      );
      setMeetings(updatedMeetings);
      saveMeetingsToLocalStorage(updatedMeetings);
      setSnackbar({ open: true, message: 'Meeting updated successfully', severity: 'success' });
    } else {
      // Add new meeting
      const newMeeting = { ...currentMeeting, id: Date.now() };
      const updatedMeetings = [...meetings, newMeeting];
      setMeetings(updatedMeetings);
      saveMeetingsToLocalStorage(updatedMeetings);
      setSnackbar({ open: true, message: 'Meeting added successfully', severity: 'success' });
    }
    
    handleCloseDialog();
  };

  // Handle deleting meeting
  const handleDeleteMeeting = (id) => {
    const updatedMeetings = meetings.filter(meeting => meeting.id !== id);
    setMeetings(updatedMeetings);
    saveMeetingsToLocalStorage(updatedMeetings);
    setSnackbar({ open: true, message: 'Meeting deleted successfully', severity: 'warning' });
  };

  // Handle snackbar close
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className="calendar-container">
        <Box className="calendar-header">
          <Box className="calendar-title">
            <Typography variant="h5" style={{fontFamily:"Nunito,sans-serif"}}>
              {viewMode === 'day' && formatDate(currentDate)}
              {viewMode === 'week' && `Week of ${formatDate(generateWeekDays()[0])}`}
              {viewMode === 'month' && new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </Typography>
          </Box>
          
          <Box className="calendar-controls">
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120, mr: 2 }}>
              <InputLabel>View</InputLabel>
              <Select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
                label="View"
                style={{fontFamily:"Nunito,sans-serif"}}
              >
                <MenuItem value="day" style={{fontFamily:"Nunito,sans-serif"}}>Day</MenuItem>
                <MenuItem value="week" style={{fontFamily:"Nunito,sans-serif"}}>Week</MenuItem>
                <MenuItem value="month" style={{fontFamily:"Nunito,sans-serif"}}>Month</MenuItem>
              </Select>
            </FormControl>
            
            <IconButton onClick={goToPrevious}>
              <ChevronLeft />
            </IconButton>
            
            <Button 
              variant="outlined" 
              onClick={() => {
                setCurrentDate(new Date());
                setCurrentMonth(new Date().getMonth());
                setCurrentYear(new Date().getFullYear());
              }}
              sx={{ mx: 1 }}
              style={{fontFamily:"Nunito,sans-serif"}}
            >
              Today
            </Button>
            
            <IconButton onClick={goToNext}>
              <ChevronRight />
            </IconButton>
            
            <Button
              variant="contained"
              startIcon={<Plus size={16} />}
              onClick={() => handleOpenDialog()}
              sx={{ ml: 2 }}
              style={{fontFamily:"Nunito,sans-serif"}}
            >
              Add Meeting
            </Button>
          </Box>
        </Box>

        <Paper className="calendar-body">
          {viewMode === 'day' && (
            <Box className="day-view">
              <Typography variant="h6" className="day-title" style={{fontFamily:"Nunito,sans-serif"}}>
                {formatDate(currentDate)}
              </Typography>
              
              <Box className="meetings-list">
                {getMeetingsForDate(currentDate).length > 0 ? (
                  getMeetingsForDate(currentDate).map(meeting => (
                    <Paper key={meeting.id} className="meeting-item">
                      <Box className="meeting-time">
                        {formatTime(meeting.startTime)} - {formatTime(meeting.endTime)}
                      </Box>
                      <Box className="meeting-details">
                        <Typography variant="subtitle1" className="meeting-title" style={{fontFamily:"Nunito,sans-serif"}}>
                          {meeting.title}
                        </Typography>
                        <Typography variant="body2" className="meeting-location">
                          {meeting.location}
                        </Typography>
                        {meeting.description && (
                          <Typography variant="body2" className="meeting-description">
                            {meeting.description}
                          </Typography>
                        )}
                        <Box className="meeting-attendees">
                          {meeting.attendees.map((attendee, index) => (
                            <Chip key={index} label={attendee} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                          ))}
                        </Box>
                      </Box>
                      <Box className="meeting-actions">
                        <Tooltip title="Edit">
                          <IconButton size="small" onClick={() => handleOpenDialog(meeting, true)}>
                            <Edit size={16} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small" color="error" onClick={() => handleDeleteMeeting(meeting.id)}>
                            <Trash2 size={16} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Paper>
                  ))
                ) : (
                  <Box className="no-meetings">
                    <CalendarIcon size={40} />
                    <Typography>No meetings scheduled for this day</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          )}

          {viewMode === 'week' && (
            <Grid container className="week-view">
              {generateWeekDays().map((day, index) => (
                <Grid item xs={12} sm={6} md={3} lg={12/7} key={index} className="week-day">
                  <Box className={`day-header ${new Date().toDateString() === day.toDateString() ? 'today' : ''}`}>
                    <Typography variant="subtitle1">
                      {day.toLocaleDateString('en-US', { weekday: 'short' })}
                    </Typography>
                    <Typography variant="h6">
                      {day.getDate()}
                    </Typography>
                  </Box>
                  
                  <Box className="day-meetings">
                    {getMeetingsForDate(day).length > 0 ? (
                      getMeetingsForDate(day).map(meeting => (
                        <Paper key={meeting.id} className="meeting-item-mini" onClick={() => handleOpenDialog(meeting, true)}>
                          <Typography variant="subtitle2" noWrap>
                            {formatTime(meeting.startTime)}
                          </Typography>
                          <Typography variant="body2" noWrap>
                            {meeting.title}
                          </Typography>
                        </Paper>
                      ))
                    ) : (
                      <Box className="no-meetings-mini">
                        <Typography variant="body2">No meetings</Typography>
                      </Box>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}

          {viewMode === 'month' && (
            <Grid container className="month-view">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName, index) => (
                <Grid item xs={12/7} key={index} className="week-day-header">
                  <Typography>{dayName}</Typography>
                </Grid>
              ))}
              
              {generateMonthDays().map((day, index) => (
                <Grid item xs={12/7} key={index} className={`month-day ${day && new Date().toDateString() === day.toDateString() ? 'today' : ''}`}>
                  {day && (
                    <>
                      <Typography className="day-number">{day.getDate()}</Typography>
                      <Box className="month-day-meetings">
                        {getMeetingsForDate(day).slice(0, 3).map(meeting => (
                          <Box 
                            key={meeting.id} 
                            className="month-meeting-item"
                            onClick={() => handleOpenDialog(meeting, true)}
                          >
                            <Typography variant="caption" noWrap>
                              {formatTime(meeting.startTime)} - {meeting.title}
                            </Typography>
                          </Box>
                        ))}
                        {getMeetingsForDate(day).length > 3 && (
                          <Typography variant="caption" className="more-meetings">
                            +{getMeetingsForDate(day).length - 3} more
                          </Typography>
                        )}
                      </Box>
                    </>
                  )}
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>

        {/* Add/Edit Meeting Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle>{isEditing ? 'Edit Meeting' : 'Add New Meeting'}</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                margin="dense"
                name="title"
                label="Meeting Title"
                fullWidth
                variant="outlined"
                value={currentMeeting.title}
                onChange={handleInputChange}
                required
              />
              
              <Box sx={{ mt: 2 }}>
                <DatePicker
                  label="Date"
                  value={currentMeeting.date}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  format="MM/dd/yyyy"
                />
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <TimePicker
                  label="Start Time"
                  value={currentMeeting.startTime}
                  onChange={(newTime) => handleTimeChange('startTime', newTime)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
                
                <TimePicker
                  label="End Time"
                  value={currentMeeting.endTime}
                  onChange={(newTime) => handleTimeChange('endTime', newTime)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Box>
              
              <TextField
                margin="dense"
                name="location"
                label="Location"
                fullWidth
                variant="outlined"
                value={currentMeeting.location}
                onChange={handleInputChange}
              />
              
              <TextField
                margin="dense"
                name="description"
                label="Description"
                fullWidth
                variant="outlined"
                value={currentMeeting.description}
                onChange={handleInputChange}
                multiline
                rows={3}
              />
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Attendees</Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <TextField
                    size="small"
                    value={newAttendee}
                    onChange={(e) => setNewAttendee(e.target.value)}
                    placeholder="Add attendee"
                    fullWidth
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddAttendee();
                      }
                    }}
                  />
                  <Button variant="outlined" onClick={handleAddAttendee}>Add</Button>
                </Box>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {currentMeeting.attendees.map((attendee, index) => (
                    <Chip
                      key={index}
                      label={attendee}
                      onDelete={() => handleRemoveAttendee(attendee)}
                      size="small"
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {isEditing ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
}