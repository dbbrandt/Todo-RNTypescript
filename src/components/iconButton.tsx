import {Pressable, StyleSheet} from 'react-native';
import {Ionicons } from '@expo/vector-icons';

interface ButtonParams {
    name: keyof typeof Ionicons.glyphMap,
    color?: string,
    size?: number,
    onPress: ()=> void,
}

const IconButton: React.FC<ButtonParams> = ({name, color, size,  onPress}) => {
    return (
        <Pressable
            android_ripple={{color: color ? color : 'grey'}}
            onPress={onPress}
            style={({pressed}) => pressed ?  styles.base : [styles.pressed, styles.base]}
        >
            <Ionicons name={name} size={size ? size : 24} color={color ? color : 'white'}/>
        </Pressable>
    )
}

export default IconButton;

const styles = StyleSheet.create({
    base: {
        padding: 10,
    },
    pressed: {
        opacity: 0.7,

    }
})