Product Requirements Document (PRD)
Project Name: Acoustic Guardian: Edge-Intelligent Sound Anomaly Detection for House

1. Objective 
•	Objective: To develop a web-based dashboard and cloud integration for an IoT system that receives audio anomaly detection events from a Texas Instruments SK-AM64B board, logs these events with timestamps, and allows users to playback associated audio clips for verification. The dashboard will also provide local notifications of detected anomalies within a home environment.

2. Problem Statement 
•	Problem Statement: To effectively demonstrate an IoT system for smart home applications, there is a need for a user-friendly interface that provides not only a record of audio anomaly detection events but also the ability to review the actual sound captured. This project addresses the challenge of building a web dashboard that receives anomaly data and corresponding audio clips from a TI board, enabling users to understand the context of the detected anomalies through playback, thereby increasing the system's usefulness and user trust.

3.1 Scope 
•	Detect predefined sound anomalies (as detected by the TI board):
•	Screaming
•	Glass breaking
•	(Work with your partner to define a small, manageable set of anomalies he can implement)
•	Receive anomaly data and associated audio clips from the TI board (via your Spring Boot backend)
•	Log anomaly events and store associated audio clips in a database/cloud storage
•	Timestamp of event
•	Type of anomaly detected
•	Link/identifier to the stored audio clip
•	Display anomaly events on a web dashboard (React frontend)
•	List of detected events with timestamps and anomaly types
•	Visual indicators (e.g., icons)
•	A button or link to initiate audio playback for each event
•	Implement audio playback functionality on the web dashboard (React) to play the associated audio clips.
•	Provide a basic local notification on the web dashboard when an anomaly is detected.
•	Make the dashboard accessible locally (within your college network or a local network)

3.2 Out of Scope 
•	SMS/Email alerts
•	Advanced data analysis or reporting
•	Full smart home integration
•	External IP access configuration (focus on local network access)
•	Real-time audio streaming (playback will be of saved clips)

4. Use Cases 
•	Use Case 1: Anomaly Monitoring and Verification
•	The user can view a list of detected audio anomalies with timestamps on the web dashboard and play back the associated audio clips to verify the event.
•	Use Case 2: Local Notification
•	The user receives a visual notification on the web dashboard when a new anomaly is detected.
•	Use Case 3: Event Review with Audio Context  --❌
•	The user can scroll through the list of logged anomalies and listen to the recorded audio for each event to understand its context.

5. Features & Requirements 
1.	Anomaly Data and Audio Clip Reception:
1.	The Spring Boot backend must receive anomaly data (timestamp, anomaly type) and the corresponding audio clip from the TI board.
2.	Define a clear API endpoint for the TI board to send this data (consider sending the audio clip as a file upload or as a byte array).

2.	Data Storage (Database/Cloud):
1.	Implement a database to store anomaly data (timestamp, anomaly type).
2.	Integrate with a basic cloud storage service (e.g., using Spring Cloud for AWS S3 integration if you're using AWS, or another simple option) to store the audio clips.
3.	Store a link or identifier in the database that points to the location of the audio clip in cloud storage.

3.	Web Dashboard (React):
1.	Develop a React application to display anomaly events.
2.	Create a user interface that lists detected anomalies with their details.
3.	Include a button or link next to each anomaly event to trigger audio playback.
4.	Provide a basic visual indication when a new anomaly is received.

4.	Backend API (Spring Boot):
1.	Create Spring Boot API endpoints for the React frontend to fetch anomaly data (including the link to the audio clip) from the database.
2.	Implement an endpoint that allows the React frontend to retrieve the audio clip from cloud storage based on the provided link/identifier.


5.	Audio Playback (React):
1.	Implement an audio player component in React that can fetch and play the audio clips from the backend API. You can use the standard HTML5 audio element or a React audio player library.

6.	Integration:
1.	Work closely with your partner to ensure the TI board correctly sends anomaly data and audio clips to your Spring Boot backend.

7.	Local Access:
1.	Configure the Spring Boot application and React dashboard to be accessible within your local network (e.g., via a local IP address).









Things in dashboard-
1. Sidebar Navigation Panel
•	Location: Left side.
•	Items:
o	Dashboard (active)
o	Anomaly Logs
o	Statistics
o	About
•	Functionality:
o	Routes the user to various sections/pages.
o	Highlights the active menu (blue glow in the design).
o	Icons provide quick visual hints.
________________________________________
2. Header Section
•	Text: Anomaly Logs
•	Function:
o	Acts as the current page label.
o	Helps orient the user on what part of the system they're in.
o	Can be dynamically set depending on which sidebar item is active.
________________________________________
3. Alert Notification Banner
•	Text: ⚠️ New anomaly detected!
•	Functionality:
o	Real-time alerts triggered by backend anomaly detection.
o	Could be made dynamic using WebSockets or polling.
o	Can be dismissed or auto-clear after viewing/logging.
________________________________________
4. Alert List Container
This section contains repeated “alert cards”.
Each Alert Card Includes:
•	Timestamp: 2025-07-02 17:34:12
•	Event Type: Glass Breaking, Screaming
•	Audio Playback:
o	A play/pause button to listen to the recorded sound.
o	A waveform visualizer simulating sound levels.
o	A volume icon to control output device volume.
How it works:
•	Alerts are likely triggered by backend ML/AI models analyzing audio.
•	Each alert is stored with a timestamp, classification label, and audio clip.
•	On frontend:
o	API pulls this list as a JSON object.
o	Audio is either embedded as base64 or served from cloud storage.
o	Waveform may be rendered using libraries like Wavesurfer.js.
________________________________________
5. Simulate Alert Button
•	Text: Simulate Alert
•	Function:
o	For testing or demo purposes—triggers a fake alert.
o	Could send a POST request to the backend which queues a simulated alert.
o	Useful during development or QA.

