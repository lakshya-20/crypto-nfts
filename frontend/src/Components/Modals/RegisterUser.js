import { useContext, useState } from "react";
import { Button, Input, InputGroup, InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { AuthContext } from "../../Services/Contexts/AuthContext";
import { ipfs_uploader } from "../../Services/Utils/ipfs";
import Loading from '../Loading';
import Toast from "../Toast";

const RegisterUser = ({isModalOpen}) => {
  const { authState, register } = useContext(AuthContext);
  const [user, setUser] = useState({
    name: "",
    img: {
      isLoading: false,
      url: "",
    }
  })
  return (
    <Modal isOpen={isModalOpen} className="modal-dialog-centered">
      <ModalHeader>Complete Your Registration</ModalHeader>
      <ModalBody>
        <div className="d-flex justify-content-center">
          {user.img.isLoading ?
            <Loading pageCenter={false}/>
          : null
          }
          {user.img.url ?
            <img src={user.img.url} alt="user image" width="60%"/>
          : null
          }
        </div>
        <InputGroup>
          <Input
            type="file"
            onChange={async (e) => {
              setUser({
                ...user,
                img: {
                  isLoading: true,
                }
              })
              const file = e.target.files[0];
              try{
                const img_url = await ipfs_uploader(file);
                setUser({
                  ...user,
                  img: {
                    url: img_url,
                    isLoading: false,
                  }
                })
              } catch (err){
                Toast("error", "Error uploading image");
              }
            }}
          />
        </InputGroup>
        <br/>
        <InputGroup>
          <InputGroupText>
            Name
          </InputGroupText>
          <Input placeholder="your name"
            onChange={(e) => setUser({
              ...user,
              name: e.target.value
            })}
          />
        </InputGroup>
        <br/>
      </ModalBody>
      <ModalFooter>
        <Button onClick={()=> register(user.name, user.img.url)}>Register</Button>
      </ModalFooter>
    </Modal>
  )
}
export default RegisterUser;