import cv2

# Initialize the webcam
cap = cv2.VideoCapture(0)  # 0 indicates the default camera (usually the built-in webcam)

# Check if the webcam opened successfully
if not cap.isOpened():
    print("Error: Could not open webcam.")
    exit()

# Read a frame from the webcam
ret, frame = cap.read()

# Check if the frame was read successfully
if not ret:
    print("Error: Could not read frame.")
    exit()

# Release the webcam (important to do this when you're done)
cap.release()

# Save the captured frame to an image file (e.g., 'captured_image.png')
cv2.imwrite('captured_image.png', frame)

print("Image captured and saved as 'captured_image.png'.")

# You can now further process or display the captured image if needed
