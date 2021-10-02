import React, { useState } from 'react';
import AvatarCard from './AvatarCard';

const CardArray = (props) => {
    const [selectedId, setSelectedId] = useState(props.userPrefs.avatar_id);
    const avatarList = props.avatars.map(({id})=>{
        return <AvatarCard id={id} key={id} selectedId={selectedId} setSelectedId={setSelectedId} setAvatar={props.setAvatar}/>
    });
    return (
        <div className="scroll">
            {avatarList}
        </div>
    )
}

export default CardArray;