import React, { useState, useContext } from "react";
import {
  Button,
  Menu,
  Portal,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { IoLayersSharp } from "react-icons/io5";
import { IoLayersOutline } from "react-icons/io5";
import Context from "../context/Context";

const LayerControlMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedLayer, setSelectedLayer } = useContext(Context);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Menu.Root>
        <Menu.Trigger>
          <IconButton onClick={toggle}>
            {isOpen ? <IoLayersOutline /> : <IoLayersSharp />}
          </IconButton>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item
                className="menuItem"
                onClick={() => setSelectedLayer("osm")}
              >
                {selectedLayer == 'osm' ? '→' : ''} OSM
              </Menu.Item>
              <Menu.Item
                className="menuItem"
                onClick={() => setSelectedLayer("satellite")}
              >
                {selectedLayer == 'satellite' ? '→' : ''} Satellite
              </Menu.Item>
              <Menu.Item
                className="menuItem"
                onClick={() => setSelectedLayer("cartoLight")}
              >
                {selectedLayer == 'cartoLight' ? '→' : ''} CartoLight
              </Menu.Item>
              <Menu.Item
                className="menuItem"
                onClick={() => setSelectedLayer("cartoDark")}
              >
                {selectedLayer == 'cartoDark' ? '→' : ''} CartoDark
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </div>
  );
};

export default LayerControlMenu;
