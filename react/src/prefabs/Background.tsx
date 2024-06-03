import background from '../assets/background.png'
export function Background() {
    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
            width: '100%',
            position: 'fixed',
            zIndex: -1
        }}></div>
    );
}