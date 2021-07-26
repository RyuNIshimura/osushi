export default function TableOfContents(props) {
  return (
    <nav className="space-y-1" aria-label="Sidebar">
      {props.tableOfContents.map((content) => (
        <a
          key={content.name}
          href={`#${content.id}`}
          className={'flex items-center px-3 py-2 text-md text-gray-500 dark:text-gray-400 font-medium rounded-sm'}>
          <span className="truncate">{content.name}</span>
        </a>
      ))}
    </nav>
  )
}