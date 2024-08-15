import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

const Index = () => {
  return (
    <div className="flex flex-col gap-[30px] h-full">
      <p className="text-[32px] leading-[30px] font-semibold">Dashboard</p>
      <div className="bg-card mb-[10px]">
        <p>asdas</p>
        <p>asdas</p>
        <p>asdas</p>
        <p>asdas</p>
        <p>asdas</p>
        <p>asdas</p> <p>asdas</p> <p>asdas</p>
        <p>asdas</p>
        <p>asdas</p>
      </div>
      <div className="grow bg-card flex flex-col">
        <p>Table</p>
        <div className="h-[45vh] relative overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>asdasd</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>asdasd</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>asdasd</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>asdasd</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>asdasd</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>asdasd</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>asdasd</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>asdasd</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>asdasd</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>asdasd</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>asdasd</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>asdasd</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>asdasd</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>asdasd</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>asdasd</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Index;
