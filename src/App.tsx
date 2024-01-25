import {useState} from 'react';
import {StyleSheet, View, Text, FlatList, SafeAreaView, TextInput, Button} from 'react-native';
import IconButton from "./components/iconButton";

type Todo = {
    id: string;
    name: string;
};

export default function App() {
    const [inputText, setInputText] = useState('');
    const [todos, setTodos] = useState<Todo[]>([]);
    const [itemEdited, setItemEdited] = useState<Todo | null>(null);
    const addTodo = () => {
        if (inputText.trim()) {
            setTodos((prevTodos) => [...prevTodos,
                {id: Date.now().toString(), name: inputText}])
            setInputText('');
        }
    }

    const saveTodo = () => {
        if (itemEdited) {
            setInputText('');
            setTodos((prevTodos) =>
                prevTodos.map((item) => item.id == itemEdited.id ?
                    {...item, name: inputText} : item));
            setItemEdited(null);
        }
    }

    const handleEdit = (todo: Todo) => {
        setItemEdited(todo);
        setInputText(todo.name);
    }

    const handleDelete = (todo: Todo) => {
        setTodos((prevTodos) =>
            prevTodos.filter((item) => item.id != todo.id));
    }

    const todoItem = (todo: Todo) => {
        return (
            <View style={styles.itemView}>
                <Text style={styles.itemList}>{todo.name}</Text>
                <View style={styles.buttons}>
                    <IconButton name='trash'
                                color='black'
                                onPress={() => handleDelete(todo)}
                    />
                    <IconButton name='pencil'
                                color='black'
                                onPress={() => handleEdit(todo)}
                    />
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>To Do App</Text>
            <TextInput style={styles.input}
                       value={inputText}
                       onChangeText={setInputText}
                       placeholder='Enter a todo'
            />
            <Button title={itemEdited ? 'Save' : 'Add Todo'}
                    onPress={itemEdited ? saveTodo : addTodo}
            />
            <FlatList data={todos}
                      renderItem={({item}) => todoItem(item)}
                      keyExtractor={item => item.id}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
    },
    itemView: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        paddingLeft: 30,
        paddingRight: 20,
    },
    itemList: {
        fontSize: 18,
    },
    input: {
        width: '90%',
        fontSize: 18,
        borderColor: 'grey',
        borderWidth: 1,
        margin: 20,
    },
    buttons: {
        flexDirection: "row",
    }

});
