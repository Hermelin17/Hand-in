package com.example.lab1actualkotlin

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.platform.LocalSoftwareKeyboardController
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.lab1actualkotlin.ui.theme.Lab1actualkotlinTheme




class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            Lab1actualkotlinTheme {
                    DisplayScreen(
                    )
                }
            }
        }
    }


@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello $name!",
        modifier = modifier
    )
}

@Composable
fun DisplayScreen() {

    val turquoise = Color(0xFF009973)

    var text by remember { mutableStateOf("") }

    Column(
        modifier = Modifier.fillMaxSize() // Box takes up full screen size
    ) {
        // Green header with "Example 1" on the left
        Box(
            modifier = Modifier
                .fillMaxWidth() // Makes the header stretch across the screen
                .height(70.dp) // Height of the header
                .background(color = turquoise) // Set the background color of the header
                .padding(start = 16.dp, top = 16.dp)
        ) {
            Text(
                text = "Example 2 - Kotlin + Compose",
                color = Color.White, // Text color
                fontSize = 25.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier
                    .align(Alignment.BottomStart) // Align text to the left
            )
        }

        // Spacer to add vertical distance
        Spacer(modifier = Modifier.height(30.dp)) // 50dp spacing from previous item

        // Image of the wheel
        Image(
            painter = painterResource(id = R.drawable.app_image),
            contentDescription = "My Image",
            modifier = Modifier
                .size(200.dp) // Adjust image size (width and height)
                .align(Alignment.CenterHorizontally) // Align the image at the top center
        )

        // Spacer to add vertical distance between image and buttons
        Spacer(modifier = Modifier.height(50.dp)) // 50dp space between image and buttons

        // Row 1: Two buttons, one on the left and one on the right
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 60.dp), // Add padding for better spacing
            horizontalArrangement = Arrangement.SpaceBetween // Distributes buttons evenly
        ) {
            Button(
                onClick = {},
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color.LightGray, // Set button background to gray
                    contentColor = Color.Black // Set text color to black
                ),
                shape = RectangleShape // Make the button rectangular
            ) {
                Text("BUTTON")
            }
            Spacer(modifier = Modifier.width(80.dp)) // Space between the buttons
            Button(
                onClick = {},
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color.LightGray, // Set button background to gray
                    contentColor = Color.Black // Set text color to black
                ),
                shape = RectangleShape // Make the button rectangular
            ) {
                Text("BUTTON")
            }
        }

        // Spacer to add vertical distance between rows
        Spacer(modifier = Modifier.height(16.dp)) // 16dp space between rows

        // Row 2: Two buttons, one on the left and one on the right
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 60.dp), // Add padding for better spacing
            horizontalArrangement = Arrangement.SpaceBetween // Distributes buttons evenly
        ) {
            Button(
                onClick = {},
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color.LightGray, // Set button background to gray
                    contentColor = Color.Black // Set text color to black
                ),
                shape = RectangleShape // Make the button rectangular
            ) {
                Text("BUTTON")
            }
            Spacer(modifier = Modifier.width(80.dp)) // Space between the buttons
            Button(
                onClick = {},
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color.LightGray, // Set button background to gray
                    contentColor = Color.Black // Set text color to black
                ),
                shape = RectangleShape // Make the button rectangular
            ) {
                Text("BUTTON")
            }
        }
        // Spacer to add vertical distance between rows
        Spacer(modifier = Modifier.height(16.dp)) // 16dp space between rows

        // Row for E-mail input field and label
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .height(75.dp)
                .padding(horizontal = 16.dp), // Add padding for better spacing
            verticalAlignment = Alignment.CenterVertically // Align text and input box vertically
        ) {
            // Text label ("Email")
            Text(
                text = "Email",
                color = Color.Black, // Text color
                fontSize = 15.sp,
                modifier = Modifier.padding(end = 16.dp) // Space between label and text input
            )

            // TextField with bottom border
            Box(
                modifier = Modifier
                    .weight(1f) // Make it take up the remaining space in the row
                    .height(65.dp) // Height of the text field
                    .padding(start = 10.dp)
            ) {
                // Use the built-in TextField component
                OutlinedTextField(
                    value = text,
                    onValueChange = { text = it },
                    textStyle = TextStyle(color = Color.Black, fontWeight = FontWeight.Bold, fontSize = 15.sp),
                    modifier = Modifier
                        .padding(5.dp),
                    singleLine = true
                )
                // Red bottom border
                Box(
                    modifier = Modifier
                        .width(302.dp)
                        .height(2.dp)
                        .padding(end = 20.dp)
                        .background(Color.Red)
                        .align(Alignment.BottomCenter)
                )
            }
        }
    }
}


@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    Lab1actualkotlinTheme {
        Greeting("Android")
    }
}