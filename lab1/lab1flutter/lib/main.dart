import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Example 1 - Flutter'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
    onTap: () {
      FocusScope.of(context).unfocus();
      },
      child: Scaffold(
        appBar: AppBar(
          // Set the background color of the AppBar to turquoise.
          backgroundColor: Colors.teal, 
          title: Text(
            widget.title,
            style: const TextStyle(color: Colors.white,)
            ),
          centerTitle: false,
        ),
        backgroundColor: Colors.white, // Set background color to white.
        body: Center(
          child:Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Image.network(
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpsfuT_VglDa2VNXUklOkAsj_Doh2jcv71ceo1DNObYmYE_zUp',
                height: 175,
                width: 135,
              ), 
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  OutlinedButton(
                    onPressed: (){}, 
                    child: const Text("Button")
                  ),

                  const SizedBox(width: 100), //Space between buttons
                  OutlinedButton(
                    onPressed: (){}, 
                    child: const Text("Button")
                  ),  
                ],
              ),

              const SizedBox(height: 30), //Space between rows
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  OutlinedButton(
                    onPressed: (){}, 
                    child: const Text("Button")
                  ),

                  const SizedBox(width: 100), //Space between buttons

                  OutlinedButton(
                    onPressed: (){}, 
                    child: const Text("Button")
                  ),  
                ],
              ),
              const SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text("Email: "),
                  SizedBox(
                    width: 200,
                    child: TextField()
                  )
                ],
              )
            ],
          )
        ),
      ),
    );
  }
}
