import { Table, Badge } from "@sumup/circuit-ui"

export const Display = ({ resources }) => {

  return (
  <Table
    headers={[
      'Resource',
      'Amount'
    ]}
    rows={[
      [
        'Wood',
        {
          children: <Badge variant="neutral">{resources.wood}</Badge>
        }
      ],
      [
        'Stone',
        {
          children: <Badge variant="neutral">{resources.stone}</Badge>
        }
      ],
      [
        'Iron',
        {
          children: <Badge variant="neutral">{resources.iron}</Badge>
        }
      ],
      [
        'Food',
        {
          children: <Badge variant="neutral">{resources.food}</Badge>
        }
      ],
      [
        'Wool',
        {
          children: <Badge variant="neutral">{resources.wool}</Badge>
        }
      ],
    ]}
  />)
}