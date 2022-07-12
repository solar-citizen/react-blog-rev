import styles from './Tab.module.css';
import React, { useState, useEffect } from 'react';
import { Button } from '../index';

const Tab = ({ children, active }) => {
  const [activeTab, setActiveTab] = useState(active);
  const [tabsData, setTabsData] = useState([]);

  useEffect(() => {
    let data = [];

    React.Children.forEach(children, (element) => {
      if (!React.isValidElement(element)) return;

      const {
        props: { tab, children },
      } = element;

      data.push({ tab, children });
    });

    setTabsData(data);
  }, [children]);

  const renderTabs = () => {
    return tabsData.map(({ tab }, i) => (
      <li key={i}>
        <Button
          active={i === activeTab ? true : false}
          type='button'
          category='primary'
          onClick={() => setActiveTab(i)}
        >
          {tab}
        </Button>
      </li>
    ));
  };

  return (
    <div className={styles.Tab}>
      <ul>{renderTabs()}</ul>

      <div className='bg-white'>{tabsData[activeTab]?.children}</div>
    </div>
  );
};

const TabPane = ({ children }) => {
  return { children };
};

Tab.TabPane = TabPane;

export default Tab;
