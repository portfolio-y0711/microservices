interface TabNavProps {
  link: string
  name: string
  icon: string
  onclick: () => Promise<void>
}

const TabNav: React.FC<TabNavProps> = ({ link, name, icon, onclick }) => {
  return (
    <li>
      <a
        onClick={() => {
          onclick()
        }}
        data-toggle="tab"
        href={`${link}`}
      >
        <i className={icon}></i>
        {name}
      </a>
    </li>
  )
}

export default TabNav
