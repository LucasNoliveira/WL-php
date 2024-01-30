import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Grid,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        nome_completo: '',
        sexo: '',
        email: '',
        celular: '',
        exame: '', // Adicionado campo exame para armazenar o código do exame selecionado
    });

    const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
    const [patientData, setPatientData] = useState(null);
    const [exames, setExames] = useState([]); // Estado para armazenar a lista de exames disponíveis

    useEffect(() => {
        // Busca a lista de exames quando o componente é montado
        const fetchExames = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/exames');
                if (response.ok) {
                    const dadosExames = await response.json();
                    setExames(dadosExames);
                    console.log(dadosExames)
                } else {
                    console.error('Falha ao buscar os exames');
                }
            } catch (error) {
                console.error('Erro ao buscar os exames:', error);
            }
        };

        fetchExames();
    }, []); // Executa o efeito apenas uma vez no montante do componente

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((dadosAnteriores) => ({
            ...dadosAnteriores,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const exameSelecionado = exames.find((exame) => exame.descricao === formData.exame);
            const codigoExame = exameSelecionado ? exameSelecionado.codigo : '';

            const formDataComCodigo = { ...formData, exame: codigoExame };

            const response = await fetch('http://127.0.0.1:8000/api/cadastrar-paciente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    exames: formData.exame ? [formData.exame] : [],
                }),
            });

            if (response.ok) {
                const dadosResposta = await response.json();
                console.log('Paciente cadastrado com sucesso:', dadosResposta);

                const { numero_atendimento } = dadosResposta;
                const respostaPaciente = await fetch(`http://127.0.0.1:8000/api/pacientes/${numero_atendimento}`);
                const dadosPaciente = await respostaPaciente.json();
                setPatientData(dadosPaciente);
            } else {
                console.error('Falha ao cadastrar o paciente');
                // Lidar com o erro, por exemplo, exibir uma mensagem de erro ao usuário
            }
        } catch (error) {
            console.error('Erro:', error);
            // Lidar com o erro
        }
    };

    const handleWelcomeMessageClose = () => {
        setShowWelcomeMessage(false);
    };

    return (
        <Container maxWidth="sm">
            <Dialog open={showWelcomeMessage} onClose={handleWelcomeMessageClose}>
                <DialogTitle>Bem-vindo admin</DialogTitle>
                <DialogContent>
                    <Typography>
                        Você está no perfil de administrador. Você tem todas as permissões para criar pacientes, registros e puxar relatórios
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleWelcomeMessageClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
            {patientData ? (
                // Renderizar os dados do paciente após o cadastro bem-sucedido
                <div>
                    <Typography variant="h5">Relatório do Paciente</Typography>
                    <Typography>Nome: {patientData.nome_completo}</Typography>
                    <Typography>Gênero: {patientData.sexo}</Typography>
                    <Typography>Email: {patientData.email}</Typography>
                    <Typography>Celular: {patientData.celular}</Typography>
                    <Typography>Exames:</Typography>
                    <ul>
                        {patientData.exames.map((exame) => (
                            <div key={exame.codigo}>
                                {exame.descricao}
                            </div>
                        ))}
                    </ul>
                </div>
            ) : (<form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Nome Completo"
                            name="nome_completo"
                            value={formData.nome_completo}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Gênero</InputLabel>
                            <Select
                                name="sexo"
                                value={formData.sexo}
                                onChange={handleInputChange}
                                label="Gênero"
                            >
                                <MenuItem value="">Selecione o seu Gênero</MenuItem>
                                <MenuItem value="M">Masculino</MenuItem>
                                <MenuItem value="F">Feminino</MenuItem>
                                <MenuItem value="O">Outro</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Celular"
                            name="celular"
                            value={formData.celular}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Exame</InputLabel>
                            <Select
                                name="exame"
                                value={formData.exame}
                                onChange={handleInputChange}
                                label="Exame"
                            >
                                <MenuItem value="">Selecione o Exame</MenuItem>
                                {exames.map((exame) => (
                                    <MenuItem key={exame.codigo} value={exame.codigo}>
                                        {exame.descricao}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Cadastrar paciente
                </Button>
            </form>
            )}
        </Container>
    );
};

export default RegistrationForm;
